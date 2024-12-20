FROM node:18 as builder

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build