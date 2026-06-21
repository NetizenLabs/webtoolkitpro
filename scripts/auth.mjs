import http from 'http';
import { URL } from 'url';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/`;

console.log("=== Pinterest Long-Lived Token Generator ===\n");

rl.question('1. Enter your Pinterest APP ID: ', (appId) => {
  rl.question('2. Enter your Pinterest APP SECRET: ', (appSecret) => {
    
    const authUrl = `https://www.pinterest.com/oauth/?client_id=${appId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=boards:read,boards:write,pins:read,pins:write`;
    
    console.log(`\n\n[ACTION REQUIRED] Click this link to authorize your app:`);
    console.log(authUrl);
    console.log(`\nWaiting for you to log in...\n`);

    const server = http.createServer(async (req, res) => {
      const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
      
      if (reqUrl.pathname === '/') {
        const code = reqUrl.searchParams.get('code');
        
        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>Success!</h1><p>You can close this window and check your terminal.</p>');
          
          console.log(`Authorization Code Received! Exchanging for Refresh Token...`);
          
          try {
            const authHeader = 'Basic ' + Buffer.from(`${appId}:${appSecret}`).toString('base64');
            
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('redirect_uri', REDIRECT_URI);

            const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
              method: 'POST',
              headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: params.toString()
            });

            const data = await response.json();

            if (data.refresh_token) {
              console.log('\n\n✅ =========================================== ✅');
              console.log('SUCCESS! HERE IS YOUR PERMANENT REFRESH TOKEN:');
              console.log(data.refresh_token);
              console.log('✅ =========================================== ✅\n');
              console.log('Save this in GitHub Secrets as PINTEREST_REFRESH_TOKEN');
            } else {
              console.log('\n❌ Failed to get refresh token:', data);
            }
          } catch (err) {
            console.error('\n❌ Network Error:', err);
          }

          server.close();
          process.exit(0);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('No code provided.');
        }
      }
    });

    server.listen(PORT, () => {
      // Server listening
    });
  });
});
