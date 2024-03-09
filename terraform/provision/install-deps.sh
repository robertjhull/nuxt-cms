#!/bin/bash
sudo apt-get update

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm

sudo npm install -g pm2

sudo mkdir -p /app
sudo chown -R $(whoami) /app

sudo pm2 startup systemd -u $(whoami) --hp $(eval echo ~$(whoami))