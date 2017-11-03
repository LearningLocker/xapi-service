FROM node:8@sha256:06ef3b52a354e0072f8115bda2094b2589286e85fca41f743c1f539638cd49c6
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
