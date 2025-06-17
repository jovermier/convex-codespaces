#!/bin/bash

# Convex Self-Hosted Setup Script
echo "🚀 Setting up Convex Self-Hosted..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env.docker exists
if [ ! -f ".env.docker" ]; then
    echo "❌ .env.docker file not found. Please create it from .env.docker.example"
    exit 1
fi

# Update Convex to latest version
echo "📦 Updating Convex to latest version..."
pnpm install convex@latest

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose --env-file .env.docker up -d

# Wait for backend to be ready
echo "⏳ Waiting for backend to start..."
sleep 15

# Check if backend is healthy
if ! curl -f http://localhost:3210/version > /dev/null 2>&1; then
    echo "❌ Backend is not responding. Check logs with: npm run docker:logs"
    exit 1
fi

# Generate admin key
echo "🔑 Generating admin key..."
ADMIN_KEY=$(docker-compose exec -T backend ./generate_admin_key.sh)

if [ -z "$ADMIN_KEY" ]; then
    echo "❌ Failed to generate admin key. Check logs with: npm run docker:logs"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update your .env.local"
echo ""
echo "2. Deploy your functions:"
echo "   npx convex dev"
echo ""
echo "3. Start your frontend:"
echo "   pnpm run dev:frontend"
echo ""
echo "🌐 Services:"
echo "   - Backend: http://localhost:3210"
echo "   - Dashboard: http://localhost:6791"
echo "   - Frontend: http://localhost:5173"
