import snoowrap from 'snoowrap';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

dotenv.config();

const {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD,
  REDDIT_SUBREDDITS,
  DOMAIN
} = process.env;

async function publishLatestPost() {
  console.log('🚀 Starting Reddit Auto-Publish...');

  // 1. Validate Credentials
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    console.error('❌ Error: Missing Reddit credentials in .env file!');
    return;
  }

  // 2. Initialize Reddit Client
  const r = new snoowrap({
    userAgent: 'WebToolkit-Pro-Auto-Publisher v1.0',
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD
  });

  // 3. Find the latest blog post
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('⚠️ No blog posts found in content/blog');
    return;
  }

  // Get the most recent file
  const latestFile = files.map(f => ({
    name: f,
    time: fs.statSync(path.join(blogDir, f)).mtime.getTime()
  })).sort((a, b) => b.time - a.time)[0].name;

  const filePath = path.join(blogDir, latestFile);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);
  const slug = latestFile.replace('.md', '');
  const postUrl = `${DOMAIN}/blog/${slug}`;

  console.log(`📝 Found latest post: "${data.title}"`);
  console.log(`🔗 Link: ${postUrl}`);

  // 4. Post to Subreddits
  const subreddits = REDDIT_SUBREDDITS.split(',').map(s => s.trim());

  for (const sub of subreddits) {
    try {
      console.log(`📤 Posting to r/${sub}...`);
      await r.getSubreddit(sub).submitLink({
        title: `${data.title} - Free Developer Tool`,
        url: postUrl,
        resubmit: false
      });
      console.log(`✅ Success: Posted to r/${sub}`);
    } catch (err) {
      if (err.message.includes('already been submitted')) {
        console.log(`ℹ️ Info: Already posted to r/${sub} recently.`);
      } else {
        console.error(`❌ Error posting to r/${sub}:`, err.message);
      }
    }
  }

  console.log('🏁 Automation complete!');
}

publishLatestPost();
