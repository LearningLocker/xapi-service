FROM node:8@sha256:47964a5f0bc5f6648313ffb1ea1a0d802c8b1334aad79333a30ee2e7c64666b0
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
