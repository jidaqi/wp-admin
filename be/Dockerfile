FROM node:18

WORKDIR /app

COPY package.json .

RUN npm i nodemon -g

RUN yarn

COPY . .

CMD ["yarn", "watch"]