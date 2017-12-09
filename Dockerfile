FROM node:8@sha256:415ef718a047fbaa486d29e8ae4bc85832664b1eb1ac919d0955b4c97caacc17
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
