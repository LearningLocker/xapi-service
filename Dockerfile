FROM node:8@sha256:7b5efee35513594007e751c5c21f58a0e78966d5c164f4a7066b0d8504fbef98
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
