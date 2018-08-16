FROM node:8@sha256:cd8ebd022c01f519eb58a98fcbb05c1d1195ac356ef01851036671ec9e9d5580
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
