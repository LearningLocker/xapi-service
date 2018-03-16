FROM node:8@sha256:94ebf816d44a4de67bdaa40768db64e3983bf8c94d25ace1cc2f28a2bce1609c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
