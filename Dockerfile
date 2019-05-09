FROM node:8@sha256:d16c9fcf0b4f219aad05d74ffeeed7a56874c2737b19c06887771634204224c4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
