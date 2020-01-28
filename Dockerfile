FROM node:8@sha256:ee25271e00572cb09d095f6b35880a284eac570c17452644bc67fd1d8dc7f9f7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
