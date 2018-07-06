FROM node:8@sha256:38953a117b8f794426429314126af19ff17bbfaa5449c1829b9a8412b8ef4536
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
