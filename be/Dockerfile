FROM node:18

WORKDIR /app

COPY package.json .

RUN yarn add global nodemon

RUN yarn

COPY . .

CMD ["yarn", "start:watch"]