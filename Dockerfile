FROM node:8@sha256:83ee9e53f73cec6c45460cafc207bb7ebd5a21f8727368c920716bea1d1f6eee
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
