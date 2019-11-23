FROM node:8@sha256:e755f9d3880a60e1783e080f4a54770e73d0b18d150a942a1f643279d25683b0
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
