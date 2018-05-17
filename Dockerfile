FROM node:8@sha256:ceb6e9e47ec034664e795d7b7e45f288e2b47a5a51cc6015dc7d672252900788
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
