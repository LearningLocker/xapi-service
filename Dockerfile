FROM node:14
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY patches patches
RUN yarn install --ignore-engines --frozen-lockfile
COPY . .
RUN yarn build

EXPOSE 80
CMD ["yarn", "start"]
