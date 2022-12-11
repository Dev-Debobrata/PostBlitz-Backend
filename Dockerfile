FROM node:18.12.1-alpine3.15

WORKDIR /src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ENV PORT=9000

EXPOSE 9000

CMD ["yarn", "dev"]
