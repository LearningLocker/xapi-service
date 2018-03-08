FROM node:8@sha256:8654f499db990f00f9b670c7d284b210a3c7bc92225947d39532c01e67f53866
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
