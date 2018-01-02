FROM nginx

RUN rm usr/share/nginx/html/*
COPY ./dist/ /usr/share/nginx/html/

RUN rm -rf /etc/nginx/conf.d/
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
