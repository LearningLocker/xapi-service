FROM node:8@sha256:811d1565e39b0cd5daaff97b69608bcf037b0428f432c63e4b30d0b307c62c38
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
