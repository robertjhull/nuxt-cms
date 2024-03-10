#!/bin/bash
set -euo pipefail

sudo apt-get update -y
sudo apt-get remove needrestart -y

sudo DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
sudo npm install -g pm2

sudo mkdir -p /app
sudo chown -R $(whoami) /app

sudo pm2 startup systemd -u $(whoami) --hp $(eval echo ~$(whoami))