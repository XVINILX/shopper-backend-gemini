FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY typeOrm.config.ts ./


RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
