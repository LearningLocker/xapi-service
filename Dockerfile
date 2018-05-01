FROM node:8@sha256:b802a02ee6496c34e2dc0eb0379eb1c738331414956d650c0dffdfa0866acb2f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
