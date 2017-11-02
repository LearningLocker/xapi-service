FROM node:8@sha256:6a0eee0590d2ec4e42eb5bb964f95a2f33df5e3e4de0759bf39f8b3a8d9db20c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
