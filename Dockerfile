FROM node:8@sha256:18743972285c2c3f5bfcdff036c325c9a160aa23d600386c9ddf3fca388dceb9
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
