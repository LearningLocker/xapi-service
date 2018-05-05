FROM node:8@sha256:74133ece3418b6e307d3f9f63cf02ebc3ea1e76b2ff13037f5bf1d423d6a1cdd
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
