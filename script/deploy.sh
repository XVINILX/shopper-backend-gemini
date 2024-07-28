#!/bin/sh
cd ~/server/pets-api
npm install --global yarn
yarn
pm2 restart ecosystem.config.js
