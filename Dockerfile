FROM node:8@sha256:5f7f5f217e581f539fb41b82b3ea6b9dfa283186b570caf75ce4a1b50e8dcc53
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
