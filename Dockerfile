FROM node:8@sha256:37ecd6c3ab4857cd1a489ce972de69bd7585e665ba1e524e8d9b5bb36a9981f6
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
