FROM node:8@sha256:c671dc2c9148c8f4a5c2ae2cd8b3524179a44dc35c924a947ce71c23c0529c12
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
