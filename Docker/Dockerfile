FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

COPY . .
RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"]