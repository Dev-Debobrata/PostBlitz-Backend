FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY conf/api_errors.conf conf/nginx.conf /etc/nginx/
COPY conf/templates/api_gateway.conf.template conf/templates/upstream.conf.template /etc/nginx/templates/

RUN mkdir api_conf.d
COPY conf/api_conf.d/user_api.conf conf/api_conf.d/admin_api.conf conf/api_conf.d/blog_api.conf /etc/nginx/api_conf.d/