#!/bin/bash
set -e

PROCESS_NAME=$1
APP_DIR=$2
GIT_URL=$3

set -x
if [[ -e $APP_DIR ]]; then
  cd $APP_DIR
  git pull
else
  if [[ -n $APP_URL ]]; then
    git clone $GIT_URL $APP_DIR
    cd $APP_DIR
  else
    exit 1
  fi
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