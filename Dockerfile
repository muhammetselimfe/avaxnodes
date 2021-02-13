FROM node:14.15.4-alpine3.12

COPY . /app
WORKDIR /app

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
