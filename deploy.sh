#!/bin/bash
set -e

cd client
brew upgrade
npm install -g cordova ionic
npm install
ionic state restore
