FROM node:8@sha256:39c16ad02f3db2051eaeff61e3ecb7f23a03610bc9acdc0ab5660f48582223d7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
