async function run() {
  const res = await fetch('https://www.pinterest.com/webtoolkitpro/frontend-development-resources.json', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    }
  });
  const text = await res.text();
  const match = text.match(/"id":"(\d+)"/);
  console.log("BOARD ID:", match ? match[1] : 'Not found');
}
run();
