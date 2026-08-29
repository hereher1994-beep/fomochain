#!/bin/bash
# ============================================================
# DEPLOY SCRIPT — robinhoodmitch.site on Hetzner 167.233.122.88
# Run as root on a fresh Ubuntu 22.04 server
# ============================================================

set -e

echo "=============================="
echo " STEP 1: System Update"
echo "=============================="
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx ufw

echo "=============================="
echo " STEP 2: Install Node.js 20"
echo "=============================="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v
npm -v

echo "=============================="
echo " STEP 3: Install PM2"
echo "=============================="
npm install -g pm2

echo "=============================="
echo " STEP 4: Clone Repository"
echo "=============================="
cd /var/www
# Replace YOUR_GITHUB_REPO_URL with your actual GitHub repo URL
git clone YOUR_GITHUB_REPO_URL fomochain
cd fomochain

echo "=============================="
echo " STEP 5: Create .env file"
echo "=============================="
cat > .env << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dummykey.updateyourkkey.here
OPENAI_API_KEY=your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-google-analytics-id-here
NEXT_PUBLIC_ADSENSE_ID=your-adsense-id-here
PERPLEXITY_API_KEY=your-perplexity-api-key-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key-here
NEXT_PUBLIC_SITE_URL=https://robinhoodmitch.site
NODE_ENV=production
PORT=3000
EOF

echo "=============================="
echo " STEP 6: Install Dependencies"
echo "=============================="
npm install

echo "=============================="
echo " STEP 7: Build App"
echo "=============================="
npm run build

echo "=============================="
echo " STEP 8: Start with PM2"
echo "=============================="
pm2 start npm --name "fomochain" -- run serve
pm2 save
pm2 startup systemd -u root --hp /root

echo "=============================="
echo " STEP 9: Configure Nginx"
echo "=============================="
cat > /etc/nginx/sites-available/robinhoodmitch.site << 'EOF'
server {
    listen 80;
    server_name robinhoodmitch.site www.robinhoodmitch.site;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/robinhoodmitch.site /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=============================="
echo " STEP 10: Firewall"
echo "=============================="
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "=============================="
echo " STEP 11: SSL with Certbot"
echo "=============================="
certbot --nginx -d robinhoodmitch.site -d www.robinhoodmitch.site --non-interactive --agree-tos -m admin@robinhoodmitch.site

echo "=============================="
echo " DONE! Site is live at:"
echo " https://robinhoodmitch.site"
echo "=============================="
