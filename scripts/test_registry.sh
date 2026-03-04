#!/bin/bash

set -e

setup_temp_app() {
  local target_dir=$1

  rm -rf "$target_dir"
  mkdir "$target_dir"

  cp ./components.json ./eslint.config.js ./index.html ./tsconfig.app.json ./tsconfig.json ./tsconfig.node.json ./vite.config.ts "$target_dir"
  cp ./package-test.json "$target_dir/package.json"
  cp -r ./public "$target_dir/public"

  mkdir "$target_dir/src"
  cp -r ./src/assets "$target_dir/src/assets"
  cp ./src/index.css ./src/main.tsx ./src/vite-env.d.ts "$target_dir/src"

  mkdir "$target_dir/src/demo"
  cp ./src/demo/authProvider.ts ./src/demo/dataProvider.ts ./src/demo/users.json ./src/vite-env.d.ts "$target_dir/src/demo"
  cp ./src/demo/App.guessers.tsx "$target_dir/src/demo/App.tsx"
}

echo "Building registry"
make build-registry

echo "Serving registry locally on port 8080"
python3 -m http.server -d ./public 8080 &
SERVER_PID=$!

echo "Creating new Vite app in a temp folder for admin block"
setup_temp_app ./temp

echo "Installing dependencies"
cd ./temp
pnpm install

echo "Adding registry components"
pnpm dlx shadcn@latest add http://localhost:8080/r/admin.json

echo "Building generated admin app"
pnpm run build

cd ..

echo "Creating new Vite app in a temp folder for rich-text-input block"
setup_temp_app ./temp-rich-text-input

echo "Installing dependencies"
cd ./temp-rich-text-input
pnpm install

echo "Configuring custom registry alias for namespaced dependencies"
node -e "const fs = require('fs'); const path = './components.json'; const json = JSON.parse(fs.readFileSync(path, 'utf8')); json.registries = { ...(json.registries || {}), '@shadcn-admin-kit': 'http://localhost:8080/r/{name}.json' }; fs.writeFileSync(path, JSON.stringify(json, null, 2));"

echo "Adding optional rich-text-input registry component"
pnpm dlx shadcn@latest add http://localhost:8080/r/rich-text-input.json

echo "Building generated rich-text-input app"
pnpm run build

echo "Stopping registry server"
kill $SERVER_PID

echo "All done!"
