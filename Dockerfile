FROM node:8@sha256:b5484d1eece03b69a2222c8444ac32730e7d0ed6be8af7304d9d0b5fd691a950
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
