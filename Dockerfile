# Stage 1: Build the Angular application
FROM node:24.3.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# RUN groupadd -r appgroup && useradd -r -g appgroup appuser
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/us-map-svg/browser /usr/share/nginx/html
# Fix permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html
RUN chown -R appuser:appgroup /var/cache/nginx
RUN chown -R appuser:appgroup /run
USER appuser
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:80 || exit 1
