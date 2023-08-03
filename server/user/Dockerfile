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

ENV NODE_ENV=production
ENV HOST=localhost
ENV PORT=9001
ENV REDIS_URL=
ENV MONGO_URL=
ENV AUTH_EMAIL=
ENV AUTH_PASS=
ENV USER_ACCESS_TOKEN_SECRET=
ENV USER_REFRESH_TOKEN_SECRET=
ENV AWS_S3_BUCKET_NAME=
ENV AWS_S3_BUCKET_REGION=
ENV AWS_S3_BUCKET_ACCESS_KEY_ID=
ENV AWS_S3_BUCKET_SECRET_ACCESS_KEY=

COPY package.json yarn.lock /usr/server/user/build/
COPY --from=builder /usr/server/user/build/ /usr/server/user/build/
RUN yarn install --production

EXPOSE 9001
CMD ["yarn", "start"]
