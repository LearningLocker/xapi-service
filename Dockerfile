FROM node:8@sha256:c1ca0596440de4f99e7f8166f191e28e565e43552ddc3911a7e62e23a284e770
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
