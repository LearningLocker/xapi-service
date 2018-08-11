FROM node:8@sha256:04986974434fc565529feaac1d62cce4f9fe99ba4906f076ce498000120a45d4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
