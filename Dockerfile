FROM node:8@sha256:e45a254cf0f7071ffae9a6770cce268baf1f1952f6abb55c1061bff0757b138f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
