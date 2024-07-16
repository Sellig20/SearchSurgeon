FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev @types/node

COPY . .

EXPOSE 3000