const axios = require('axios');
const fs = require('fs');

const KEY = '1f83d3525461439ab37eacdc4f0bca92';
const HOST = 'wtkpro.site';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const LINKS_FILE = 'wtkpro-links.txt';

async function submitToIndexNow() {
    try {
        const links = fs.readFileSync(LINKS_FILE, 'utf8')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const payload = {
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: links
        };

        console.log(`🚀 Submitting ${links.length} URLs to IndexNow...`);

        const endpoints = [
            'https://www.bing.com/indexnow',
            'https://yandex.com/indexnow'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.post(endpoint, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(`✅ Successfully submitted to ${endpoint}. Status: ${response.status}`);
            } catch (error) {
                console.error(`❌ Failed to submit to ${endpoint}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

submitToIndexNow();
