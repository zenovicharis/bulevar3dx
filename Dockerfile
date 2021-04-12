FROM node:12.18.2 as build

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install
COPY . .
RUN npm run prod


FROM nginx:latest
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
# FROM php:8.0-cli-alpine

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN composer --version

# COPY ./composer.json /app/composer.json
# WORKDIR /app
# RUN composer install

# EXPOSE 8000

# CMD php -S 0.0.0.0:8000 -t dist