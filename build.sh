#!/bin/bash

echo "🚀 Starting build process..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install and build server
echo "🔧 Installing server dependencies..."
cd server
npm install
cd ..

# Install and build client
echo "🎨 Installing client dependencies and building..."
cd client
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo "📁 Built files are in client/build/"
echo "🌐 Server will serve static files from this directory in production"
