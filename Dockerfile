
FROM nginx:alpine

LABEL maintainer="Abhay Rana <Abhayrana0263@gmail.com>"
LABEL description="Devops & Cloud Engineer Interactive Portfolio"

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html style.css script.js /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

>>>>>>> a6ed7b3 (Docker added)
CMD ["nginx", "-g", "daemon off;"]
