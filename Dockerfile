FROM node:8@sha256:26e4c77f9f797c3993780943239fa79419f011dd93ae4e0097089e2145aeaa24
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
