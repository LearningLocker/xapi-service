FROM node:8@sha256:a95cbb8c0d34bb8c19cff50ec515672d95106299f8f2fc8ccde2079e3ba55702
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
