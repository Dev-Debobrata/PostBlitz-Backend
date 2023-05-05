FROM node:18.12.1-alpine3.15 AS builder

LABEL author="Debobrata"
LABEL version="1.0.0"
LABEL description="Dockerfile for server"

WORKDIR /usr/server

COPY package.json yarn.lock /usr/server/
COPY . /usr/server/
RUN yarn install
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /usr/server/build

COPY package.json yarn.lock /usr/server/build/
COPY --from=builder usr/server/.env /usr/server/build/ /usr/server/build/
RUN yarn install --production

EXPOSE 9000
CMD ["yarn", "start"]
