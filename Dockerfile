FROM node:8@sha256:bf53a8c5bd188f63b1b83cedfa24d2db54f753c7478ebd7afa4e85208b45185b
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
