# Deploying your Vite + React app (Lovable) on Portainer

This repo looks like a Vite + React SPA. Use this production-ready Nginx setup.

## Files
- `Dockerfile` – multi-stage: builds with Node, serves with Nginx
- `nginx.conf` – SPA routing (fallback to `index.html`)
- `docker-compose.yml` – local ports or Traefik-ready

## How to use

1) Copy these files into the root of your repo (same folder as `package.json`).

2) Build locally or let Portainer build:
   ```bash
   docker compose build
   docker compose up -d
   ```
   Then open http://localhost:8080

### Portainer (Stacks)

- Go to **Stacks** → **Add stack**
- Paste the contents of `docker-compose.yml`
- Toggle "Build from git repo" if you want Portainer to pull via Git; otherwise upload files
- **Deploy the stack**

### Traefik (optional)
If you use Traefik:
- Remove the `ports:` section
- Uncomment the `labels:` + `networks:` blocks
- Replace `app.example.com` with your domain
- Ensure your Traefik stack exposes the `traefik_public` network

### Notes
- `npm ci` will be used automatically if `package-lock.json` is present (recommended)
- If you use **pnpm** or **bun**, adapt the Dockerfile accordingly (replace `npm ci` with your tool)

