const axios = require('axios');
const fs = require('fs');
const path = require('path');

const KEY = 'f45c2f8b88d34796b94904d5e3abf608';
const HOST = 'www.severancecalculator.xyz';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function submitToIndexNow() {
    try {
        const repoDir = path.join(__dirname, '..', 'severance-calculator-repo');
        const baseUrl = `https://${HOST}`;
        const links = [];

        // 1. Static root pages (except index.html and files starting with dot/f45c)
        if (fs.existsSync(repoDir)) {
            const rootFiles = fs.readdirSync(repoDir);
            rootFiles.forEach(file => {
                if (file.endsWith('.html') && file !== 'index.html') {
                    const name = file.slice(0, -5);
                    links.push(`${baseUrl}/${name}`);
                }
            });
        }
        links.push(`${baseUrl}/`); // home page

        // 2. Legal pages
        const legalDir = path.join(repoDir, 'legal');
        if (fs.existsSync(legalDir)) {
            const files = fs.readdirSync(legalDir);
            files.forEach(file => {
                if (file.endsWith('.html')) {
                    const name = file.slice(0, -5);
                    links.push(`${baseUrl}/legal/${name}`);
                }
            });
        }

        // 3. Blog pages
        const blogDir = path.join(repoDir, 'blog');
        if (fs.existsSync(blogDir)) {
            const files = fs.readdirSync(blogDir);
            files.forEach(file => {
                if (file.endsWith('.html')) {
                    const name = file.slice(0, -5);
                    if (name === 'index') {
                        links.push(`${baseUrl}/blog`);
                    } else {
                        links.push(`${baseUrl}/blog/${name}`);
                    }
                }
            });
        }

        const uniqueLinks = Array.from(new Set(links)).sort();

        // Write the dynamically compiled links to SUBMIT_TO_SEARCH_CONSOLE.txt for records
        const searchConsoleFile = path.join(repoDir, 'SUBMIT_TO_SEARCH_CONSOLE.txt');
        fs.writeFileSync(searchConsoleFile, uniqueLinks.join('\n'));
        console.log(`[IndexNow] Compiled and saved ${uniqueLinks.length} dynamic links for Severance to SUBMIT_TO_SEARCH_CONSOLE.txt`);

        const payload = {
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: uniqueLinks
        };

        console.log(`[IndexNow] Submitting ${uniqueLinks.length} dynamic URLs for Severance Calculator to IndexNow...`);

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
        console.error('[IndexNow] Critical error during Severance submission:', error.message);
    }
}

submitToIndexNow();
