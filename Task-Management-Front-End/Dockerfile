# Stage 1: Build production assets
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve assets with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Note: If your build script outputs to a folder named "build" instead of "dist", change /app/dist to /app/build above.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]