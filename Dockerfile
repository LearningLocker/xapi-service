FROM node:8@sha256:e97846b0e7b077385ea2145b4073ac7a92253881568ab4fe20b2fdc5b66b4814
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
