FROM node:8@sha256:9f1271db6874a0570e00f39273003ff22c1d358c0c612f553c11c8727ce49426
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
