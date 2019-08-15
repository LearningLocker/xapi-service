FROM node:8@sha256:2f614cda37edd3cfea0ae2d733c5c58ce4d5bc433b6115cb6ea06f0ead3c623f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
