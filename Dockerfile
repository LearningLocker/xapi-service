FROM node:8@sha256:d5ad3f5dfcb5682356f3422e84be2ac3d83b03b82df84e4f1292fea21927c8b2
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
