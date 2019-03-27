FROM node:8@sha256:918f0be3932f555cd2645ca828b9c231a2dab10d9cf2dbb58896411207bbe52f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
