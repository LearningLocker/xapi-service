FROM node:8@sha256:9e0f85344b2602cbaee3dd31ad6599347e45664bb7cecd24bb4648f508052aa1
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
