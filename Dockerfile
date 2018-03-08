FROM node:8@sha256:da5ce3229e1e2b7776be77bbdf679d2c8c2df66396e8cfd16e1007ddb2a9e855
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
