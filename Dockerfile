FROM node:14-buster

WORKDIR /usr/src/app

COPY package.json yarn.lock lerna.json /usr/src/app/
COPY packages/app/package.json /usr/src/app/packages/app/
COPY packages/backend/package.json /usr/src/app/packages/backend/
RUN yarn install
COPY . /usr/src/app/
RUN yarn tsc
RUN yarn build

CMD ["yarn", "start"]