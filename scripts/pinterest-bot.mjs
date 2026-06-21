import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'scripts', 'pins-data.json');
const PINS_DIR = path.join(process.cwd(), 'public', 'images', 'pins');

// Environment Variables required for GitHub Actions
const APP_ID = process.env.PINTEREST_APP_ID;
const APP_SECRET = process.env.PINTEREST_APP_SECRET;
const REFRESH_TOKEN = process.env.PINTEREST_REFRESH_TOKEN;
const BOARD_ID = process.env.PINTEREST_BOARD_ID;
const PINS_PER_DAY = parseInt(process.env.PINS_PER_DAY || '3', 10);

async function getAccessToken() {
  const authHeader = 'Basic ' + Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64');
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', REFRESH_TOKEN);

  const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  const data = await response.json();
  if (data.access_token) {
    return data.access_token;
  } else {
    throw new Error('Failed to refresh access token: ' + JSON.stringify(data));
  }
}

async function uploadPin(pinData, accessToken) {
  const filePath = path.join(PINS_DIR, pinData.filename);
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }

  const imageBuffer = fs.readFileSync(filePath);
  const base64Data = imageBuffer.toString('base64');
  const contentType = pinData.filename.endsWith('.jpg') ? 'image/jpeg' : 'image/png';

  const payload = {
    link: pinData.link,
    title: pinData.title,
    description: pinData.description,
    board_id: BOARD_ID,
    media_source: {
      source_type: "image_base64",
      content_type: contentType,
      data: base64Data
    }
  };

  try {
    const response = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Pinterest API Error for ${pinData.filename}:`, data);
      return false;
    }

    console.log(`Successfully uploaded ${pinData.filename}! Pin ID: ${data.id}`);
    return true;

  } catch (err) {
    console.error(`Network Error uploading ${pinData.filename}:`, err);
    return false;
  }
}

async function runBot() {
  console.log('--- Starting Pinterest Auto-Poster Bot ---');

  if (!APP_ID || !APP_SECRET || !REFRESH_TOKEN || !BOARD_ID) {
    console.error('CRITICAL ERROR: Missing Pinterest environment variables.');
    process.exit(1);
  }

  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const pendingPins = db.filter(p => p.status === 'pending');

  if (pendingPins.length === 0) {
    console.log('No pending pins found. Exiting.');
    process.exit(0);
  }

  const pinsToUpload = pendingPins.slice(0, PINS_PER_DAY);
  let uploadCount = 0;

  for (const pin of pinsToUpload) {
    console.log(`Uploading pin: ${pin.title}`);
    const success = await uploadPin(pin, accessToken);
    if (success) {
      pin.status = 'published';
      pin.postedAt = new Date().toISOString();
      uploadCount++;
    }
    // Rate limit delay
    await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  console.log(`\nSuccessfully uploaded ${uploadCount} pins. ${db.filter(p => p.status === 'pending').length} pins remaining in queue.`);
}

runBot();
