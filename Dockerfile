# ==============================================================================
# DOCKERFILE - TODOLIST FRONTEND SERVICE
# ==============================================================================
# Pure Node.js container that builds and serves the React + Vite application

FROM node:18-alpine

WORKDIR /app

# Copy package manifests first to optimize Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the production bundle into the /app/dist directory
# The browser will send API requests directly to Express on port 5000
ENV VITE_API_URL=http://localhost:5000/api/
RUN npm run build

# Expose port 3001 for incoming HTTP traffic
EXPOSE 3001

# Serve the production build directly with Vite preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]
