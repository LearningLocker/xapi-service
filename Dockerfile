FROM node:8@sha256:dcc9c0d61a9dd1e8c56dc1d9fd5280c8a5da2d584c06e8c48e9fd50335f1fbcf
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
