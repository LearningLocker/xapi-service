FROM node:8@sha256:de151851364686c32c74c31345e8e3e5db4e9fb93869f706412b50f20ab2ef8d
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
