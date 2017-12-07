FROM node:8@sha256:51c26be635dc4b93500f0562d9b60fe0a5c71ec610f758b7961cf7726796ef1c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
