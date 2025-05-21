#!/bin/bash

set -e

echo "Building registry"
make build-registry

echo "Serving registry locally on port 8080"
python3 -m http.server -d ./public 8080 &
SERVER_PID=$!

echo "Creating new Vite app in a temp folder"
rm -rf ./temp
mkdir ./temp

echo "Copying files"
cp ./components.json ./eslint.config.js ./index.html ./tsconfig.app.json ./tsconfig.json ./tsconfig.node.json ./vite.config.ts ./temp
cp ./package-test.json ./temp/package.json
cp -r ./public ./temp/public

mkdir ./temp/src
cp -r ./src/assets ./temp/src/assets
cp ./src/authProvider.ts ./src/dataProvider.ts ./src/index.css ./src/main.tsx ./src/users.json ./src/vite-env.d.ts ./temp/src
cp ./src/App.guessers.tsx ./temp/src/App.tsx

echo "Installing dependencies"
cd ./temp
pnpm install

echo "Adding registry components"
pnpm dlx shadcn@latest add http://localhost:8080/r/shadcn-admin-kit-base.json

echo "Stopping registry server"
kill $SERVER_PID

echo "Building generated app"
pnpm run build

echo "All done!"