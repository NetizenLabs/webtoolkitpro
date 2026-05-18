const axios = require('axios');
const fs = require('fs');
const path = require('path');

const KEY = 'd3b469adcef147d2861a79281624f890';
const HOST = 'tradeconvert.pro';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function submitToIndexNow() {
    try {
        const repoDir = path.join(__dirname, '..', 'tradeconvert');
        const baseUrl = `https://${HOST}`;
        const links = [];

        const excludeDirs = ['.git', 'assets', 'css', 'js', 'scratch', 'tools'];

        function scanDirectory(dir, relPath = '') {
            const items = fs.readdirSync(dir);
            items.forEach(item => {
                const fullPath = path.join(dir, item);
                if (fs.statSync(fullPath).isDirectory()) {
                    if (excludeDirs.includes(item)) return;

                    // Check if directory has index.html
                    const indexPath = path.join(fullPath, 'index.html');
                    if (fs.existsSync(indexPath)) {
                        const currentRelPath = relPath ? `${relPath}/${item}` : item;
                        links.push(`${baseUrl}/${currentRelPath}/`);
                    }

                    // Recursive scan
                    scanDirectory(fullPath, relPath ? `${relPath}/${item}` : item);
                }
            });
        }

        // Add root path if index.html exists
        if (fs.existsSync(path.join(repoDir, 'index.html'))) {
            links.push(`${baseUrl}/`);
        }

        // Scan subdirectories
        if (fs.existsSync(repoDir)) {
            scanDirectory(repoDir);
        }

        const uniqueLinks = Array.from(new Set(links)).sort();

        // Write the dynamically compiled links to SUBMIT_TO_SEARCH_CONSOLE.txt inside tradeconvert for records
        const recordFile = path.join(repoDir, 'SUBMIT_TO_SEARCH_CONSOLE.txt');
        fs.writeFileSync(recordFile, uniqueLinks.join('\n'));
        console.log(`[IndexNow] Compiled and saved ${uniqueLinks.length} dynamic links for TradeConvert to SUBMIT_TO_SEARCH_CONSOLE.txt`);

        const payload = {
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: uniqueLinks
        };

        console.log(`[IndexNow] Submitting ${uniqueLinks.length} dynamic URLs for TradeConvert to IndexNow...`);

        const endpoints = [
            'https://www.bing.com/indexnow',
            'https://yandex.com/indexnow'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.post(endpoint, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(`✅ [IndexNow] Successfully submitted to ${endpoint}. Status: ${response.status}`);
            } catch (error) {
                console.error(`❌ [IndexNow] Failed to submit to ${endpoint}:`, error.message);
            }
        }
    } catch (error) {
        console.error('[IndexNow] Critical error during TradeConvert submission:', error.message);
    }
}

submitToIndexNow();
