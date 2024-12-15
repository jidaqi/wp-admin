FROM node:18

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn add nodemon

RUN yarn

COPY . .

CMD ["yarn", "start:watch"]