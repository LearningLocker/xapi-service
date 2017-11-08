FROM node:8@sha256:ae75ba3568f2c3d93b0952bd1a1888434bbd6e2ea8c907aa57836958be688cef
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
