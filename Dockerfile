FROM node:8@sha256:1878acbe73877a443460971ef67bbafcca8996fc81496dadf27b240e23318a3b
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
