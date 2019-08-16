FROM node:8@sha256:c1c738e90e6c1f1f44043be5d0e77f1f16253b50ec4d98ab0f887fca72820a95
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
