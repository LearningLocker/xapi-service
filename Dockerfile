FROM node:8@sha256:4d7a0358ce961c70514ac6e65a57cbeda3a143faba5da3fec22e62262f6448b0
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
