const https = require('https');

https.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://wtkpro.site/&strategy=mobile', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (result.error) {
        console.error("API Error:", result.error.message);
        return;
      }
      const lighthouse = result.lighthouseResult;
      const audits = lighthouse.audits;
      
      console.log("Performance Score:", lighthouse.categories.performance.score * 100);
      console.log("FCP:", audits['first-contentful-paint'].displayValue);
      console.log("LCP:", audits['largest-contentful-paint'].displayValue);
      console.log("TBT:", audits['total-blocking-time'].displayValue);
      console.log("CLS:", audits['cumulative-layout-shift'].displayValue);
      console.log("Speed Index:", audits['speed-index'].displayValue);
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
