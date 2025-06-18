# Convex tutorial

You're just a few minutes away from having a chat app powered by Convex.

## Getting Started

### Local Development

Follow the tutorial at
[docs.convex.dev/tutorial](https://docs.convex.dev/tutorial) for instructions.

### GitHub Codespaces

This project is configured to work seamlessly with GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/?skip_quickstart=true&machine=basicLinux32gb&repo=1003183238&ref=main&devcontainer_path=.devcontainer%2Fdevcontainer.json&geo=UsEast)

#### Quick Start

1. **Open in Codespaces**: Click the "Code" button on GitHub and select "Create codespace on main"
2. **Wait for setup**: The devcontainer will automatically install dependencies
3. **Set up Convex**: You'll need to configure your Convex deployment:
   ```bash
   npx convex login
   npx convex init
   ```
4. **Start development**: Run the development servers:
   ```bash
   npm run dev:codespaces
   ```

#### Port Configuration

The following ports are automatically forwarded:

- **5173**: Vite development server (your React app)
- **8187**: Convex development server
- **3000**: Convex dashboard (if using self-hosted)

#### Environment Setup

If you're using Convex Cloud:

1. Run `npx convex login` to authenticate
2. Run `npx convex init` to set up your project
3. Follow the prompts to connect to your Convex deployment

If you're using self-hosted Convex:

1. Set up your environment variables in a `.env` file
2. Use the docker commands: `npm run docker:up`

#### Development Commands

- `npm run dev:codespaces` - Start both frontend and backend for Codespaces
- `npm run dev` - Start both frontend and backend locally (may try to open browser)
- `npm run build` - Build frontend for production
- `npm run dev:backend` - Start only the Convex backend
- `npm run dev:frontend` - Start only the frontend (opens browser)
- `npm run dev:frontend:codespaces` - Start only the frontend for Codespaces (no browser)
- `npm run predev` - Run Convex backend once (prepares for dev)
- `npm run docker:up` - Start self-hosted Convex backend (Docker)
- `npm run docker:down` - Stop all Docker containers
- `npm run docker:logs` - View logs from Docker containers
- `npm run docker:dashboard` - Show dashboard URL for self-hosted backend
- `npm run docker:generate-admin-key` - Generate admin key for self-hosted backend
- `npm run self-hosted:setup` - Run self-hosted setup script
- `npm run self-hosted:setup-manual` - Manual self-hosted setup (with wait)
- `npm run self-hosted:dev` - Start self-hosted backend and frontend (sequential)
- `npm run self-hosted:stop` - Stop self-hosted backend
- `npm run convex:update` - Update Convex to latest version
- `npm run deploy-functions` - Deploy Convex functions (used internally)

> **Note:** Some scripts use `pnpm` internally. If you encounter issues, try using `pnpm` instead of `npm` for installing dependencies.

#### Accessing Your App

Once the development server is running:

1. Click on the "Ports" tab in VS Code
2. Click the globe icon next to port 5173 to open your app
3. The Convex dashboard will be available on port 8187 (if running)

#### Troubleshooting

**Port Access Issues**

If you can't access the app:

1. Check the "Ports" tab in VS Code
2. Ensure port 5173 is set to "Public"
3. Try clicking the globe icon to open in browser

**Convex Connection Issues**

If Convex isn't connecting:

1. Make sure you're logged in: `npx convex login`
2. Check your deployment URL in `convex/_generated/api.js`
3. Verify your environment variables are set correctly

**Build Issues**

If you encounter build errors:

1. Clear node_modules: `rm -rf node_modules && pnpm install`
2. Clear Convex cache: `npx convex dev --once --clear`
3. Restart the development servers
