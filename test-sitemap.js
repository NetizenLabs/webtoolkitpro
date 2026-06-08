const { spawn } = require('child_process');
const http = require('http');

const server = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'start'], {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('Waiting for server...');
let retries = 0;

const check = () => {
  http.get('http://localhost:3000/sitemap-tools.xml', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('SITEMAP:', data.substring(0, 500));
      server.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    retries++;
    if (retries > 30) {
      console.error('Failed to connect', err);
      server.kill();
      process.exit(1);
    }
    setTimeout(check, 1000);
  });
};

setTimeout(check, 2000);
