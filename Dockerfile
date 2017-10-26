FROM node:8@sha256:38fffe0479899db202a26b87da2a10e5be38e5525390f2c96820c058fbd177bc
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
