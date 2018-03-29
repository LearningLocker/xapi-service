FROM node:8@sha256:d4f30a5e6229ecea698f1d0499576b1df170e949fb8fd98631296cd260598a47
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
