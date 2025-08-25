# Use the official Playwright image as the base image
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run the tests
CMD ["npx", "playwright", "test"]