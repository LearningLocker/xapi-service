FROM node:8@sha256:d97f5bf54e016ad55dd0475f8710b99be14884ab1afcae8875f8092341264b0c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
