FROM node:8@sha256:088d24b725c0a711b6f23e11d792267d5a0e39e420dd2b9b2d51d1dc5de8f610
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
