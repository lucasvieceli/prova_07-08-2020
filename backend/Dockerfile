FROM node:10
RUN yarn global add concurrently nodemon sequelize-cli typescript

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

RUN ls

CMD [ "yarn", "run", "start:dev" ]