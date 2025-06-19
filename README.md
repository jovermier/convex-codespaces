# Convex Tutorial

You're just a few minutes away from having a chat app powered by Convex.

---

## GitHub Codespaces

This project is configured to work seamlessly with GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/?skip_quickstart=true&machine=basicLinux32gb&repo=1003183238&ref=main&devcontainer_path=.devcontainer%2Fdevcontainer.json&geo=UsEast)

Codespaces is the **primary intended way** to use this repo. All setup and development is automated for you in the cloud.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Local Development (Convex Cloud)](#local-development-convex-cloud)
- [Self-Hosted Setup (Docker)](#self-hosted-setup-docker)
- [Switching Between Cloud and Self-Hosted](#switching-between-cloud-and-self-hosted)
- [Development Commands](#development-commands)
- [Accessing Services](#accessing-services)
- [Troubleshooting](#troubleshooting)
- [Security Note](#security-note)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) and Docker Compose (for self-hosted)

---

## Local Development (Convex Cloud)

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Login and initialize Convex:**
   ```bash
   pnpm dlx convex login
   pnpm dlx convex init
   ```
3. **Start the development servers:**
   ```bash
   pnpm dev
   ```
4. **Access your app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Convex Dev Server: [http://localhost:3210](http://localhost:3210)

---

## Self-Hosted Setup (Docker)

This project supports running Convex in a self-hosted environment using Docker containers.

### 1. Configure Environment

- Copy and edit the environment files if needed:
  ```bash
  cp .env.local.example .env.local
  cp .env.docker.example .env.docker
  ```
- **Edit `.env.docker`**:
  - Change `INSTANCE_SECRET` to a secure value (do not use the default for production!)
  - Adjust ports if needed
- **Edit `.env.local`**:
  - Comment out any cloud URL:
    ```bash
    # VITE_CONVEX_URL=...
    ```
  - Uncomment and set the self-hosted URL:
    ```bash
    VITE_CONVEX_URL=http://localhost:3210
    CONVEX_SELF_HOSTED_URL=http://localhost:3210
    # CONVEX_SELF_HOSTED_ADMIN_KEY= (will be set automatically)
    ```

### 2. First Time Setup (Automated)

Run the post-create setup script (automatically run in Codespaces/devcontainer, or run manually):

```bash
./post-create-setup.sh
```

This will:

- Install dependencies
- Create `.env.local` and `.env.docker` if missing
- Start Docker containers
- Generate an admin key and update `.env.local`
- Deploy Convex functions
- Stop Docker containers

### 3. Start Self-Hosted Development

Start both backend and frontend (sequential):

```bash
pnpm run self-hosted:dev
```

Stop the backend:

```bash
pnpm run self-hosted:stop
```

### 4. Manual Setup (Alternative)

If you want to do the steps manually:

1. Start backend and generate admin key:
   ```bash
   pnpm run self-hosted:setup-manual
   ```
2. Update `.env.local` with the generated admin key (if not set automatically):
   - Set `CONVEX_SELF_HOSTED_ADMIN_KEY=<paste-key-here>`
3. Deploy functions:
   ```bash
   pnpm dlx convex dev
   ```

---

## Switching Between Cloud and Self-Hosted

- **To use Convex Cloud:**

  1. In `.env.local`, comment out `VITE_CONVEX_URL=http://localhost:3210`
  2. Uncomment and set your cloud URL: `VITE_CONVEX_URL=...`
  3. Run `pnpm dev`

- **To use Self-Hosted:**
  1. In `.env.local`, comment out the cloud URL
  2. Uncomment/set `VITE_CONVEX_URL=http://localhost:3210`
  3. Run `pnpm run self-hosted:dev`

---

## Development Commands

- `pnpm dev` - Start frontend (and backend if using Convex Cloud)
- `pnpm run dev:backend` - Start Convex backend (Cloud)
- `pnpm run dev:frontend` - Start frontend only
- `pnpm run build` - Build frontend for production
- `pnpm run docker:up` - Start self-hosted Convex backend (Docker)
- `pnpm run docker:down` - Stop Docker containers
- `pnpm run docker:logs` - View logs from Docker containers
- `pnpm run docker:generate-admin-key` - Generate admin key for self-hosted backend
- `pnpm run self-hosted:setup-manual` - Manual self-hosted setup (with wait)
- `pnpm run self-hosted:dev` - Start self-hosted backend and frontend (sequential)
- `pnpm run self-hosted:stop` - Stop self-hosted backend
- `pnpm run convex:update` - Update Convex to latest version
- `pnpm run deploy-functions` - Deploy Convex functions (used internally)

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
- **Missing functions**: After switching to self-hosted, redeploy with `pnpm dlx convex dev`
- **Build issues**:
  1. Clear node_modules: `rm -rf node_modules && pnpm install`
  2. Clear Convex cache: `pnpm dlx convex dev --once --clear`
  3. Restart the development servers
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
pnpm dlx convex export --path backup.zip

# Import data after setup
pnpm dlx convex import --replace-all backup.zip
```

---

## Security Note

**Always change the `INSTANCE_SECRET` in `.env.docker` before deploying to any non-local environment!**

---

## GitHub Codespaces

This project is configured to work seamlessly with GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new/?skip_quickstart=true&machine=basicLinux32gb&repo=1003183238&ref=main&devcontainer_path=.devcontainer%2Fdevcontainer.json&geo=UsEast)

1. **Open in Codespaces**: Click the "Code" button on GitHub and select "Create codespace on main"
2. **Wait for setup**: The devcontainer will automatically install dependencies
3. **Set up Convex**: You'll need to configure your Convex deployment:
   ```bash
   pnpm dlx convex login
   pnpm dlx convex init
   ```
4. **Start development**: Run the development servers:
   ```bash
   pnpm run dev:codespaces
   ```

#### Port Configuration

The following ports are automatically forwarded:

- **5173**: Vite development server (your React app)
- **3210**: Convex development server
- **6791**: Convex dashboard (if using self-hosted)

#### Accessing Your App

Once the development server is running:

1. Click on the "Ports" tab in VS Code
2. Click the globe icon next to port 5173 to open your app
3. The Convex dashboard will be available on port 6791 (if running)
