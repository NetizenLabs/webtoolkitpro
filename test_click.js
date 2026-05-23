const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  await page.goto('https://wtkpro.site', { waitUntil: 'networkidle2' });

  // Get event listeners on document
  const docListeners = await page.evaluate(() => {
    // Puppeteer doesn't have getEventListeners natively in page.evaluate, 
    // so we will just try to trigger a click and see if preventDefault is called.
    const a = document.querySelector('a[href="/tools/"]');
    if (!a) return 'No link found';
    
    let defaultPrevented = false;
    a.addEventListener('click', (e) => {
      // If default was already prevented by something else capturing/bubbling
      // Wait, we can't easily see other listeners.
      console.log('Link clicked natively');
    });

    return 'Ready to click';
  });

  console.log('Setup:', docListeners);

  // Let's execute a click in the browser context
  await page.evaluate(() => {
    const a = document.querySelector('a[href="/tools/"]');
    a.click();
  });

  await new Promise(r => setTimeout(r, 2000));
  
  const currentUrl = page.url();
  console.log('URL after click:', currentUrl);

  await browser.close();
})();
