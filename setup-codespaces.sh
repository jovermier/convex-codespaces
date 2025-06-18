#!/bin/bash

echo "🚀 Setting up Convex Tutorial for Codespaces..."

# Check if user is already logged into Convex
if convex auth whoami > /dev/null 2>&1; then
    echo "✅ Already logged into Convex"
else
    echo "🔐 Please log into Convex:"
    echo "Run: npx convex login"
    echo ""
fi

# Check if convex is initialized
if [ ! -f "convex/_generated/api.js" ]; then
    echo "⚙️  Convex not initialized. Please run:"
    echo "npx convex init"
    echo ""
else
    echo "✅ Convex is initialized"
fi

echo "🎯 Ready to start development!"
echo "Run: pnpm run dev:codespaces"
echo ""
echo "Your app will be available on port 5173"
echo "Convex dashboard (if applicable) will be on port 8187"
