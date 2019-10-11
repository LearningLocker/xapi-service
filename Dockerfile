FROM node:8@sha256:ee34b078492dc7b7137601f1c1ed3d7f2d3d82050342bdd52e182550a086131f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
