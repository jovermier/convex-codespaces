# Convex Self-Hosted Setup

This project now supports running Convex in a self-hosted environment using Docker containers.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm/pnpm for running the frontend

## Configuration

### Environment Variables

The self-hosted configuration is stored in `.env.docker`. Key variables to configure:

- `INSTANCE_SECRET`: **Important!** Change this from the default value for security
- `PORT`: Backend service port (default: 3210)
- `DASHBOARD_PORT`: Dashboard port (default: 6791)

### Frontend Configuration

To use the self-hosted backend, update `.env.local`:

1. Comment out the cloud URL:

   ```bash
   # VITE_CONVEX_URL=...
   ```

2. Uncomment the self-hosted URL:
   ```bash
   VITE_CONVEX_URL=http://localhost:3210
   ```

## Running Self-Hosted Convex

### First Time Setup (Important!)

**Option A: Automated Setup (Recommended)**

```bash
# Make sure you've edited .env.docker first!
npm run self-hosted:setup
```

**Option B: Manual Setup**

Before you can use the self-hosted Convex backend, you need to:

2. **Start the backend and generate admin key**:

   ```bash
   npm run self-hosted:setup-manual
   ```

   This will start the Docker containers and generate an admin key for authentication.

3. **Configure your project** by updating `.env.local`:

   - Comment out the cloud URL:
     ```bash
     # VITE_CONVEX_URL=...
     ```
   - Uncomment and configure the self-hosted settings:
     ```bash
     VITE_CONVEX_URL=http://localhost:3210
     CONVEX_SELF_HOSTED_URL=http://127.0.0.1:3210
     CONVEX_SELF_HOSTED_ADMIN_KEY=<paste-the-generated-admin-key-here>
     ```

4. **Deploy your functions**:
   ```bash
   npx convex dev
   ```

### Option 1: Use npm scripts (Recommended)

Start both the self-hosted backend and frontend:

```bash
npm run self-hosted:dev
```

Stop the self-hosted backend:

```bash
npm run self-hosted:stop
```

### Option 2: Manual Docker commands

Start the backend services:

```bash
npm run docker:up
```

View logs:

```bash
npm run docker:logs
```

Stop the services:

```bash
npm run docker:down
```

Start the frontend separately:

```bash
npm run dev:frontend
```

## Accessing Services

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Convex Backend**: http://localhost:3210
- **Convex Dashboard**: http://localhost:6791

## Development Workflow

1. **First time setup**:

   ```bash
   # Update Convex to latest version
   npm run convex:update

   # Edit .env.docker and change INSTANCE_SECRET
   # Start backend and generate admin key
   npm run self-hosted:setup

   # Copy the generated admin key and update .env.local with:
   # - VITE_CONVEX_URL=http://localhost:3210
   # - CONVEX_SELF_HOSTED_URL=http://127.0.0.1:3210
   # - CONVEX_SELF_HOSTED_ADMIN_KEY=<your-generated-key>

   # Deploy your functions to the self-hosted backend
   npx convex dev
   ```

2. **Regular development**:

   ```bash
   npm run self-hosted:dev
   ```

3. **When done**:
   ```bash
   npm run self-hosted:stop
   ```

## Important Notes

- **Admin Key**: The admin key is required for the Convex CLI and dashboard to authenticate with your self-hosted backend
- **Latest Convex Version**: Self-hosting requires the latest version of Convex (`npm run convex:update`)
- **Function Deployment**: After switching to self-hosted, you must redeploy your functions with `npx convex dev` or `npx convex deploy`

## Switching Between Cloud and Self-Hosted

### To Cloud:

1. In `.env.local`, comment out `VITE_CONVEX_URL=http://localhost:3210`
2. Uncomment `VITE_CONVEX_URL=...`
3. Run `npm run dev`

### To Self-Hosted:

1. In `.env.local`, comment out the cloud URL
2. Uncomment `VITE_CONVEX_URL=http://localhost:3210`
3. Run `npm run self-hosted:dev`

## Data Persistence

The self-hosted setup uses Docker volumes to persist data. Your data will survive container restarts but will be lost if you remove the volumes.

To completely reset the self-hosted environment:

```bash
docker-compose down -v  # This removes volumes and all data!
```

## Troubleshooting

1. **Port conflicts**: If ports 3210, 3211, or 6791 are in use, modify them in `.env.docker`
2. **Connection issues**: Ensure Docker services are healthy by checking `npm run docker:logs`
3. **Frontend not connecting**: Verify `VITE_CONVEX_URL` in `.env.local` matches your backend configuration
4. **Authentication errors**: Make sure you've generated and configured the admin key properly
5. **Missing functions**: After switching to self-hosted, redeploy with `npx convex dev`

### Useful Commands

```bash
# Generate a new admin key
npm run docker:generate-admin-key

# View backend logs
npm run docker:logs

# Export data before migration
npx convex export --path backup.zip

# Import data after setup
npx convex import --replace-all backup.zip
```

## Security Note

**Always change the `INSTANCE_SECRET` in `.env.docker` before deploying to any non-local environment!**
