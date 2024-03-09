#!/bin/bash
set -euo pipefail

git clone https://github.com/robertjhull/nuxt-cms /app/nuxt-cms

cd /app/nuxt-cms
npm i
npm run build
pm2 startOrReload /apps/ecosystem.config.json