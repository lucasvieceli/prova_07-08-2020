FROM node:10

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

RUN ls

CMD [ "yarn", "run", "start", "--host","0.0.0.0" ]