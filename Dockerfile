FROM node:8@sha256:f2f3d88b4d21820a01f19dd56f24ce96ab59e52aebdc61ee24f51d91f445bc64
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
