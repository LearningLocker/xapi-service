FROM node:8@sha256:e7afdd6bf13353858f58275659c29178d48b72b1ecd445d0ab000637a5e2d5a2
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
