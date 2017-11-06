FROM node:8@sha256:eb85fc5b1198f5e1ec025ea07586bdbbf397e7d82df66c90d7511f533517e063
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
