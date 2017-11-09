FROM node:8@sha256:552348163f074034ae75643c01e0ba301af936a898d778bb4fc16062917d0430
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
