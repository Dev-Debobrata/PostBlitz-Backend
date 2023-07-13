FROM node:18.12.1-alpine3.15 AS builder

LABEL author="Debobrata"
LABEL version="1.0.0"
LABEL description="Dockerfile for server"

WORKDIR /usr/server/admin

COPY package.json yarn.lock /usr/server/admin/
COPY . /usr/server/admin/
RUN yarn install
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /usr/server/admin/build

COPY package.json yarn.lock /usr/server/admin/build/
COPY --from=builder usr/server/admin/.env /usr/server/admin/build/ /usr/server/admin/build/
RUN yarn install --production

EXPOSE 9002
CMD ["yarn", "start"]
