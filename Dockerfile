FROM node:8@sha256:51e3a82bc141a4646b86acc76f52b7c2ef72a5050d97788cc0bd41e029f0d711
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
