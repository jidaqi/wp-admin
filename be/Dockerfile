FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm i nodemon -g

RUN yarn

COPY . .

CMD ["yarn", "watch"]