FROM node:8@sha256:d7e7c57cb609d0f22b31b552918b3300e70bd4f7c2e0b915f275cf9a64c1a43d
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
