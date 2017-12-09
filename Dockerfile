FROM node:8@sha256:f9cab05aa0ef0815af6068c00f13fffd782aedb150a4ca33c0d17d2aa495e34b
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
