FROM node:8@sha256:c151597d05a3c8c4e7b2e988f71c8cd645235d96f39a47b16b1930ef9e7a5aab
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
