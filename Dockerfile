FROM node:8@sha256:9bbdc58808c163ecd2448d78c092798b4d7d5abec72f9a8e44549018eac14bed
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
