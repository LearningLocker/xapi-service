FROM node:8@sha256:9e4f5027e6b4781fed0424c4db47707820e81d9f4c738fd3e01cb7cafe117ed4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
