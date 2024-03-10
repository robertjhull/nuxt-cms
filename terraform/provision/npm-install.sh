#!/bin/bash
set -euo pipefail
set NUXT_TELEMETRY_DISABLED=1

mkdir -p /app/nuxt-cms
git clone https://github.com/robertjhull/nuxt-cms /app/nuxt-cms

cd /app/nuxt-cms
npm install -y
npm run build

pm2 startOrReload /app/ecosystem.config.json