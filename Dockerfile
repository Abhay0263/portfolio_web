FROM nginx:alpine

LABEL maintainer="Abhay Rana <Abhayrana0263@gmail.com>"
LABEL description="DevOps & Cloud Engineer Interactive Portfolio"

# Clean default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static website assets (HTML, CSS, JS)
COPY index.html styles.css script.js /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
