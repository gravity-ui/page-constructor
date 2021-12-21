FROM registry.yandex.net/data-ui/node-nginx:14r1

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
COPY ./docker/nginx /etc/nginx
COPY ./docker/supervisor /etc/supervisor/conf.d
RUN npm run deps:install && rm -rf /tmp/* && npm run storybook:build && npm run deps:truncate

CMD /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
