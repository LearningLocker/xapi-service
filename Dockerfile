FROM node:8@sha256:acd0d53169592d955c1a668ba9685bf9cb6a1daf5adba000ad28f35108bf5fde
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
