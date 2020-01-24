#!/bin/bash
set -e

PROCESS_NAME=portal
APP_DIR=/home/lukeb/paddl-portal
GIT_URL=git@github.com:lukebettridge/mern-auth-boilerplate.git

set -x
if [[ -e $APP_DIR ]]; then
  cd $APP_DIR
  git pull
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR
fi

# Install dependencies
npm install --production
npm prune --production

# Build application
npm build

# Restart app
pm2 restart $PROCESS_NAME