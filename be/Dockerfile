FROM node:18

WORKDIR /app

COPY package.json .

RUN npm i nodemon -g

RUN npm i

COPY . .

CMD ["npm", "run watch"]