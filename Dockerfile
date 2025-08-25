# Stage 1: Build
FROM node:18-bullseye AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Runtime with Playwright
FROM mcr.microsoft.com/playwright:v1.42.1-jammy
WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy application code
COPY . .

# Install browsers
RUN npx playwright install --with-deps

# Verify installation
RUN npx playwright --version

CMD ["npx", "playwright", "test"]