#!/bin/bash

# Convex Post-Create Setup Script
# This script should only be run ONCE after the devcontainer or Codespace is created.
echo "🚀 Running post-create setup for Convex..."

echo "📦 Installing project dependencies..."
pnpm config set ignore-scripts false
pnpm install

# Checking and creating .env files
env_file=".env.local"
example_env_file=".env.local.example"
docker_env_file=".env.docker"
docker_example_env_file=".env.docker.example"
if [ ! -f "$env_file" ]; then
    if [ -f "$example_env_file" ]; then
        cp "$example_env_file" "$env_file"
        echo "Created $env_file from $example_env_file."
    else
        echo "❌ $env_file does not exist and $example_env_file not found."
        exit 1
    fi
fi

if [ ! -f "$docker_env_file" ]; then
    if [ -f "$docker_example_env_file" ]; then
        cp "$docker_example_env_file" "$docker_env_file"
        echo "Created $docker_env_file from $docker_example_env_file."
    else
        echo "❌ $docker_env_file does not exist and $docker_example_env_file not found."
        exit 1
    fi
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🐳 Starting Docker containers..."
pnpm run docker:up

echo "🔑 Generating admin key (for Docker backend)..."
ADMIN_KEY=$(docker compose exec -T backend ./generate_admin_key.sh)
if [ -z "$ADMIN_KEY" ]; then
    echo "❌ Failed to generate admin key. Check logs with: npm run docker:logs"
    exit 1
fi

if grep -q '^CONVEX_SELF_HOSTED_ADMIN_KEY=' "$env_file"; then
    sed -i "s#^CONVEX_SELF_HOSTED_ADMIN_KEY=.*#CONVEX_SELF_HOSTED_ADMIN_KEY=$ADMIN_KEY#" "$env_file"
else
    echo "CONVEX_SELF_HOSTED_ADMIN_KEY=$ADMIN_KEY" >> "$env_file"
fi

echo "🚀 Deploying Convex functions..."
pnpm run deploy-functions

echo "🐳 Stopping Docker containers..."
pnpm run docker:down