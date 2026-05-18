const axios = require('axios');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const KEY = '6d189025483f441e958ab690ecd9d797';
const HOST = 'wtkpro.site';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const CATEGORY_KEYS = [
    'developer-tools',
    'seo-tools',
    'design-tools',
    'generators',
    'network-performance',
    'content-utilities',
    'revenue-analytics'
];

async function submitToIndexNow() {
    try {
        const baseUrl = `https://${HOST}`;
        const links = [];

        // 1. Static URLs
        const staticPaths = [
            '/',
            '/tools',
            '/about',
            '/blog',
            '/privacy',
            '/ai-visibility',
            '/contact',
            '/author',
            '/terms',
            '/brand',
            '/disclaimer'
        ];
        staticPaths.forEach(p => links.push(`${baseUrl}${p}/`));

        // 2. Hub / Category URLs
        CATEGORY_KEYS.forEach(slug => {
            links.push(`${baseUrl}/tools/category/${slug}/`);
            const hubSlug = slug.replace(/ & /g, '-').replace(/\s+/g, '-');
            links.push(`${baseUrl}/tools/hub/${hubSlug}/`);
        });

        // 3. Blog URLs (Read dynamically from content/blog directory)
        const blogDir = path.join(__dirname, '..', 'content', 'blog');
        if (fs.existsSync(blogDir)) {
            const files = fs.readdirSync(blogDir);
            files.forEach(file => {
                if (file.endsWith('.md')) {
                    const slug = file.slice(0, -3);
                    links.push(`${baseUrl}/blog/${slug}/`);
                }
            });
        }

        // 4. Tool URLs (Read dynamically from config/tools.yaml)
        const toolsYamlPath = path.join(__dirname, '..', 'config', 'tools.yaml');
        if (fs.existsSync(toolsYamlPath)) {
            const fileContents = fs.readFileSync(toolsYamlPath, 'utf8');
            const data = yaml.load(fileContents);
            const rawTools = data.tools || [];
            rawTools.forEach(tool => {
                links.push(`${baseUrl}/tools/${tool.slug}/`);
            });
        }

        // De-duplicate and sort links
        const uniqueLinks = Array.from(new Set(links)).sort();

        // Write the dynamically compiled links to wtkpro-links.txt for record/auditing purposes
        const linksFilePath = path.join(__dirname, '..', 'wtkpro-links.txt');
        fs.writeFileSync(linksFilePath, uniqueLinks.join('\n'));
        console.log(`[IndexNow] Compiled and saved ${uniqueLinks.length} dynamic links to wtkpro-links.txt`);

        const payload = {
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: uniqueLinks
        };

        console.log(`[IndexNow] Submitting ${uniqueLinks.length} dynamic URLs to IndexNow...`);

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
        console.error('[IndexNow] Critical error during submission:', error.message);
    }
}

submitToIndexNow();
