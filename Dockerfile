FROM node:8@sha256:25825d9cf262f4103ff5aaf02ec1a7eab00f1ef9e62e0556880df23ca5f77ed0
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
