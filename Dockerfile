FROM node:8@sha256:3dc377430ed62815eac3d97f08f3760bca89250c6168515e4e5e03d892745825
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
