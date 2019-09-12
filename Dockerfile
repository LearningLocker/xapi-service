FROM node:8@sha256:a07ce30ff4e6ae7a6f2c2c1abd7b7b293aaee89510569932a68d00b897cbe055
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
