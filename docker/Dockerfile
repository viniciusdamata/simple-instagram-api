FROM amd64/node:14.15.0

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 3333

CMD ["yarn","run", "dev"]