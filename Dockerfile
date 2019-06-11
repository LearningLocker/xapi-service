FROM node:8@sha256:75b524a4b07a24b677c821307052000e2d19d4aaafe72505950bc567148a6aba
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
