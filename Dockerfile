FROM node:8@sha256:c4ea1d1f718962e98661a19f5bc2658e696a732a3f7e94ae2c79b93235bbc714
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
