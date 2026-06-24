# ---- Frontend (React + Vite) ----

# Stage 1: build the static assets
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite inlines env vars at BUILD time, so they must be present here.
# VITE_API_BASE_URL="" makes the app call relative "/api" paths (proxied by nginx).
ARG VITE_API_BASE_URL=""
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG VITE_PAYMENT_RETURN_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY
ENV VITE_PAYMENT_RETURN_URL=$VITE_PAYMENT_RETURN_URL

RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
