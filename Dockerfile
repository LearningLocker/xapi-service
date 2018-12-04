FROM node:8@sha256:dd2381fe1f68df03a058094097886cd96b24a47724ff5a588b90921f13e875b7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
