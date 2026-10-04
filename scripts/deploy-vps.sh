#!/usr/bin/env bash
# Deploy to kvspt.com/pdf (pm2 "pdf", port 3006, /root/pdf/{app,data,.env}).
# Usage: SSHPASS=... [SKIP_BUILD=1] [ADMIN_EMAIL=..] [ADMIN_PASSWORD=..] scripts/deploy-vps.sh
# ADMIN_PASSWORD is only used to create /root/pdf/.env on the first deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
HOST=${HOST:-root@205.209.115.156}
PORT=${APP_PORT:-3006}
SSH="sshpass -e ssh -o PubkeyAuthentication=no -o StrictHostKeyChecking=no $HOST"

if [ -z "${SKIP_BUILD:-}" ]; then
  NEXT_PUBLIC_BASE_PATH=/pdf npx next build
fi
rm -rf .deploy && mkdir .deploy
cp -r .next/standalone .deploy/app
rm -rf .deploy/app/public .deploy/app/.next/static
cp -r public .deploy/app/public
cp -r .next/static .deploy/app/.next/static
rm -rf .deploy/app/data
tar -C .deploy -czf .deploy/app.tgz app
sshpass -e scp -o PubkeyAuthentication=no -o StrictHostKeyChecking=no .deploy/app.tgz "$HOST:/root/pdf-app.tgz"

HASH=""
if [ -n "${ADMIN_PASSWORD:-}" ]; then
  HASH=$(ADMIN_PASSWORD="$ADMIN_PASSWORD" node -e "const c=require('crypto');const s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync(process.env.ADMIN_PASSWORD,s,32).toString('hex'))")
fi

$SSH "ADMIN_EMAIL='${ADMIN_EMAIL:-admin@kvspt.com}' HASH='$HASH' PORT='$PORT' bash -s" <<'REMOTE'
set -euo pipefail
mkdir -p /root/pdf/data
if [ ! -f /root/pdf/.env ]; then
  [ -n "$HASH" ] || { echo "First deploy needs ADMIN_PASSWORD"; exit 1; }
  cat > /root/pdf/.env <<ENV
NODE_ENV=production
PORT=$PORT
HOSTNAME=127.0.0.1
DATA_DIR=/root/pdf/data
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD_HASH=$HASH
SESSION_SECRET=$(openssl rand -hex 32)
ENV
  chmod 600 /root/pdf/.env
fi
rm -rf /root/pdf/app.new && mkdir /root/pdf/app.new
tar -C /root/pdf/app.new --strip-components=1 -xzf /root/pdf-app.tgz
rm -rf /root/pdf/app.old
[ -d /root/pdf/app ] && mv /root/pdf/app /root/pdf/app.old
mv /root/pdf/app.new /root/pdf/app
rm -f /root/pdf-app.tgz
if pm2 describe pdf >/dev/null 2>&1; then
  pm2 restart pdf --update-env
else
  pm2 start /root/pdf/app/server.js --name pdf --cwd /root/pdf/app --node-args="--env-file=/root/pdf/.env"
fi
pm2 save >/dev/null
sleep 3
curl -s -o /dev/null -w "local check: %{http_code}\n" "http://127.0.0.1:$PORT/pdf/"
REMOTE
rm -rf .deploy
