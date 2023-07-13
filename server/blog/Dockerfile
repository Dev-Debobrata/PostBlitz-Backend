FROM node:18.12.1-alpine3.15 AS builder

LABEL author="Debobrata"
LABEL version="1.0.0"
LABEL description="Dockerfile for server"

WORKDIR /usr/server/blog

COPY package.json yarn.lock /usr/server/blog/
COPY . /usr/server/blog/
RUN yarn install
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /usr/server/blog/build

COPY package.json yarn.lock /usr/server/blog/build/
COPY --from=builder usr/server/blog/.env /usr/server/blog/build/ /usr/server/blog/build/
RUN yarn install --production

EXPOSE 9003
CMD ["yarn", "start"]
