# ==============================================================================
# Production Dockerfile for Abhay Rana's Portfolio Web
# Base: Lightweight Alpine Linux with Nginx (~25MB image size)
# ==============================================================================

FROM nginx:alpine

# Metadata labels
LABEL maintainer="Abhay Rana <Abhiryana0263@gmail.com>"
LABEL description="DevOps & Cloud Engineer Interactive Portfolio"

# Clean default Nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration with security headers & gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files (HTML, CSS, JS)
COPY index.html styles.css script.js /usr/share/nginx/html/

# Expose standard HTTP port
EXPOSE 80

# Health check to ensure Nginx container is responding
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
