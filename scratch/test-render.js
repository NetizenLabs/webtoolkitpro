const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
    
    await page.goto('http://localhost:3000/tools/sql-toolkit/', { waitUntil: 'networkidle0' });
    
    // Wait for 2 seconds to see if hydration throws
    await new Promise(r => setTimeout(r, 2000));
    
    const html = await page.content();
    console.log("HTML contains ToolRenderer:", html.includes('Tool interface coming soon'));
    console.log("HTML length:", html.length);
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
