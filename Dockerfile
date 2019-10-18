FROM node:8@sha256:723750b1acf5c7e752e4270e3cc5a5e54c845ba769b62a104e60f722b5bfad42
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
