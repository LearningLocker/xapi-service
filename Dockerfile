FROM node:8@sha256:ee05e35226b0eabc15c64189bc78ff767d1c379b7d7cdb01337d269ded60da79
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
