FROM node:8@sha256:090e91ff2325ca4aa558771b7f24819825b5c8f520fb891723555bb48811f534
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
