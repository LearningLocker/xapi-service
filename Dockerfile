FROM node:8@sha256:285d186869b2e5b448ef65aff214481274f7f64d08e91d0e0861e8b9f3f04293
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
