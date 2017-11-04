FROM node:8@sha256:3c0dad06d2c8698df70fc692675712cd8862e52078bc9a40e6775c5c15877918
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
