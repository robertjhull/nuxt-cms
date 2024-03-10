#!/bin/bash
set -euo pipefail

mkdir -p /app/nuxt-cms
git clone https://github.com/robertjhull/nuxt-cms /app/nuxt-cms

cd /app/nuxt-cms
npm install -y
# NUXT_TELEMETRY_DISABLED=1 npm run build

# cd .. && pm2 startOrReload ecosystem.config.json