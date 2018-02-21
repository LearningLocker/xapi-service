FROM node:8@sha256:e54e8d37bd8c85b3f607a4978d0d50c21cba0e6a3e132651ea0f19b5dfc76203
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
