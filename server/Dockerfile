# ---- Backend (Express API) ----
FROM node:20-alpine

WORKDIR /app

# Install production dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the server source
COPY . .

# The API listens on this port (overridable via the PORT env var)
EXPOSE 9000

# Run the server directly (no nodemon in production)
CMD ["node", "server.js"]
