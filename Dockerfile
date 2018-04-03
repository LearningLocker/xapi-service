FROM node:8@sha256:9657809c879d6f5064904c4f03fff3cb1b644f659a93ed798d31bd6a1e268c19
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
