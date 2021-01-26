FROM node:12.18.3-alpine3.12

COPY . /app
WORKDIR /app

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
