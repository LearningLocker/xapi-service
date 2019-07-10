FROM node:8@sha256:39ed5b5d194692727e785327790d0dbc5bc4bcfa041c93635d5bcc56bd6dbb5f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
