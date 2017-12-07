FROM node:8@sha256:c16b9e7772284130b78e6406a3b72928788f69fccc87be2f39171c5a772ede7a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
