FROM node:8@sha256:29fa03786c29062e2817b336a335efb67b1bf965481ed6cbe9b3ff071ca1d6c6
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
