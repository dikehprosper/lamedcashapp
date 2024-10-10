# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Serve the built Next.js app
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/ ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start"]
