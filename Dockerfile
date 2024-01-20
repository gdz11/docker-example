FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/lecture11-examples/ /usr/share/nginx/html
EXPOSE 80