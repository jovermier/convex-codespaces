# Convex Self-Hosted Tutorial

You're just a few minutes away from having a chat app powered by self-hosted Convex.

This project supports three deployment options:

- **GitHub Codespaces** (recommended) - Fully automated setup
- **Local Development Container** - Consistent local environment
- **Local Development** - Direct local setup

---

## Table of Contents

- [Getting Started](#getting-started)
- [GitHub Codespaces Setup](#github-codespaces-setup)
- [Local Development Container](#local-development-container)
- [Local Development Setup](#local-development-setup)
- [Development Commands](#development-commands)
- [Accessing Services](#accessing-services)
- [Troubleshooting](#troubleshooting)
- [Security Note](#security-note)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) and Docker Compose

---

## GitHub Codespaces Setup

This project is configured to work seamlessly with GitHub Codespaces with fully automated setup.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/?skip_quickstart=true&machine=basicLinux32gb&repo=1003183238&ref=main&devcontainer_path=.devcontainer%2Fdevcontainer.json&geo=UsEast)

1. **Open in Codespaces**: Click the "Code" button on GitHub and select "Create codespace on main"
2. **Wait for setup**: The post-create script will automatically:
   - Install dependencies with pnpm
   - Create environment files from examples
   - Configure Codespace URLs for ports 3210 and 3211
   - Set ports 3210 and 5173 to public
   - Start Docker containers
   - Generate admin key
   - Deploy Convex functions
   - Stop Docker containers (ready for development)
3. **Start development**: Once setup is complete, run:
   ```bash
   pnpm run docker:up  # Start the Convex backend
   pnpm dev           # Start the Vite development server
   ```
   Note: The post-start script will automatically start Docker containers when the Codespace restarts.

#### Port Configuration

The following ports are automatically forwarded and configured:

- **5173**: Vite development server (your React app)
- **3210**: Convex self-hosted backend
- **6791**: Convex dashboard

#### Accessing Your App

Once the development server is running:

1. Click on the "Ports" tab in VS Code
2. Click the globe icon next to port 5173 to open your app
3. The Convex dashboard will be available on port 6791

---

## Local Development Container

If you prefer to run the development container locally:

1. **Prerequisites**: Ensure Docker Desktop is running
2. **Open in VS Code**: Open this project in VS Code with the Dev Containers extension
3. **Reopen in Container**: VS Code will prompt to reopen in container, or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
4. **Wait for setup**: The post-create script will automatically:
   - Install dependencies with pnpm
   - Create environment files from examples
   - Start Docker containers
   - Generate admin key
   - Deploy Convex functions
   - Stop Docker containers (ready for development)
5. **Start development**: Once setup is complete, run:
   ```bash
   pnpm run docker:up  # Start the Convex backend
   pnpm dev           # Start the Vite development server
   ```
   Note: The post-start script will automatically start Docker containers when the container restarts.

---

## Local Development Setup

For direct local development without containers:

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Copy and edit the environment files:

```bash
cp .env.local.example .env.local
cp .env.docker.example .env.docker
```

**Edit `.env.docker`**:

- Change `INSTANCE_SECRET` to a secure value (do not use the default for production!)
- Adjust ports if needed

**Edit `.env.local`**:

- Set the self-hosted URL:
  ```bash
  VITE_CONVEX_URL=http://localhost:3210
  CONVEX_SELF_HOSTED_URL=http://localhost:3210
  # CONVEX_SELF_HOSTED_ADMIN_KEY= (will be set automatically)
  ```

### 3. First Time Setup

Run the post-create setup script manually:

```bash
pnpm run self-hosted:setup-manual
```

This will:

- Create environment files if they don't exist
- Start Docker containers
- Generate an admin key and update `.env.local`
- Deploy Convex functions
- Stop Docker containers

### 4. Start Development

```bash
pnpm run docker:up  # Start the Convex backend
pnpm dev           # Start the Vite development server
```

Note: You need to run both commands - the Docker containers for the Convex backend and the Vite development server separately.

---

## Development Commands

- `pnpm dev` - Start Vite development server (frontend only)
- `pnpm run docker:up` - Start self-hosted Convex backend (Docker)
- `pnpm run docker:down` - Stop Docker containers
- `pnpm run docker:logs` - View logs from Docker containers
- `pnpm run docker:generate-admin-key` - Generate admin key for self-hosted backend
- `pnpm run deploy-functions` - Deploy Convex functions to self-hosted backend
- `pnpm run build` - Build frontend for production
- `pnpm run self-hosted:setup-manual` - Run post-create setup manually

> All scripts use `pnpm`. If you encounter issues, ensure you are using `pnpm` for installing dependencies and running commands.

---

## Accessing Services

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Convex Backend**: [http://localhost:3210](http://localhost:3210)
- **Convex Dashboard**: [http://localhost:6791](http://localhost:6791)

---

## Troubleshooting

- **Port conflicts**: If ports 3210, 3211, or 6791 are in use, modify them in `.env.docker`
- **Connection issues**: Ensure Docker services are healthy by checking `pnpm run docker:logs`
- **Frontend not connecting**: Verify `VITE_CONVEX_URL` in `.env.local` matches your backend configuration
- **Authentication errors**: Make sure you've generated and configured the admin key properly
- **Missing functions**: After switching to self-hosted, redeploy with `pnpm run deploy-functions`
- **Build issues**:
  1. Clear node_modules: `rm -rf node_modules && pnpm install`
  2. Clear Convex cache: `pnpm run deploy-functions`
  3. Restart both the Docker containers and development server
- **Data persistence**: Docker volumes are used for backend data. To reset:
  ```bash
  docker compose down -v  # Removes volumes and all data!
  ```

### Useful Commands

```bash
# Generate a new admin key
pnpm run docker:generate-admin-key

# View backend logs
pnpm run docker:logs

# Export data before migration
pnpm run convex export --path backup.zip

# Import data after setup
pnpm run convex import --replace-all backup.zip
```

---

## Security Note

**Always change the `INSTANCE_SECRET` in `.env.docker` before deploying to any non-local environment!**
