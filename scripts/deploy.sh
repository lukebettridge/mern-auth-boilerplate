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
npm install

# Build application
npm run build

# Remove dev dependencies
npm prune --production

# Undo any local changes
git reset --hard

# Restart app
pm2 restart $PROCESS_NAME