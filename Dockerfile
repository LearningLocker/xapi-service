FROM node:8@sha256:8b62fd99341bd457d197b786e935e048da1c46ef47a505bd49c6d63cd469d3d1
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
