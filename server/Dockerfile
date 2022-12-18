FROM node:18.12.1-alpine3.15

WORKDIR /usr/server/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 9000
CMD ["yarn", "start"]