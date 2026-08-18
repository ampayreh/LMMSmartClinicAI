#!/usr/bin/env bash
set -e

echo "=== Building AWS Lambda Chat Function ==="
cd "$(dirname "$0")/chat"
npm install
npm run build

echo "=== Packaging Lambda Deployment Package ==="
mkdir -p dist/node_modules
cp -R node_modules/* dist/node_modules/ 2>/dev/null || true

cd ..
echo "=== SAM Deploying Function to AWS ==="
sam build -t template.yaml
sam deploy --guided --stack-name lmmc-smart-clinic-ai

echo "=== Deployment Complete ==="
