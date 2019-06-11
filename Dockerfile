FROM node:8@sha256:65c4ca91ca5e1a6b2947f3336e5190fdf93bfd70dd4aafdb07ae1111cdaa1044
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
