#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Use: ./setup.sh NewName"
  exit 1
fi

NEW_NAME=$1
CURRENT_DIR=$(basename "$PWD")
PARENT_DIR=$(dirname "$PWD")

echo "📦 Updating name in package.json..."
if [ -f "package.json" ]; then
  sed -i "s/\"name\": \".*\"/\"name\": \"$NEW_NAME\"/" package.json
else
  echo "⚠️ Package.json not found"
fi

echo "📁 Renaming project dir..."
cd "$PARENT_DIR" || exit
mv "$CURRENT_DIR" "$NEW_NAME"
cd "$NEW_NAME" || exit

if [ -d ".git" ]; then
  echo "🧹 Deleting .git..."
  rm -rf .git
fi

echo "🔧 New repo initializing..."
git init
git add .
git commit -m "Initial commit for $NEW_NAME"

bun install

echo "✅ Project renamed to '$NEW_NAME' and ready to use"
