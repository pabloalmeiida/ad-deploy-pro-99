# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Prefer 'npm ci' if lockfile exists for reproducible builds
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source
COPY . .

# Build static assets
RUN npm run build

# ---- Run stage ----
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx config with SPA-friendly one
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
