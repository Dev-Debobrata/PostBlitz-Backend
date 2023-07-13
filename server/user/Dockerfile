FROM node:18.12.1-alpine3.15 AS builder

LABEL author="Debobrata"
LABEL version="1.0.0"
LABEL description="Dockerfile for server"

WORKDIR /usr/server/user

COPY package.json yarn.lock /usr/server/user/
COPY . /usr/server/user/
RUN yarn install
RUN yarn build

FROM node:18.12.1-alpine3.15

WORKDIR /usr/server/user/build

COPY package.json yarn.lock /usr/server/user/build/
COPY --from=builder usr/server/user/.env /usr/server/user/build/ /usr/server/user/build/
RUN yarn install --production

EXPOSE 9001
CMD ["yarn", "start"]
