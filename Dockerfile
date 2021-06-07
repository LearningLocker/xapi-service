FROM node:12
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY patches patches
RUN yarn install --production --ignore-engines --frozen-lockfile
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
