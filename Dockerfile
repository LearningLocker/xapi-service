FROM node:8@sha256:06adec3330444f71d8fd873600c20d6cec1aed6c26c714c881eebd03391814f2
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
