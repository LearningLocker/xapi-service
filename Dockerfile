FROM node:8@sha256:06c7033a274aab131b07e7b8da8d1f823ee752a6e1e2bd46c0b459921ab2c39a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
