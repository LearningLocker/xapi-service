FROM node:8@sha256:2177522bc0f342e171a7817f2de0e25a7ab35fb6d9e7ca66aef887aa82230e78
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
