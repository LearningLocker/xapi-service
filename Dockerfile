FROM node:8@sha256:ee7adf8240cd6e06d96b459c69a7900bd8a044accc74ee2f3ae7d432c8d034e5
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
