FROM node:8@sha256:0fe5d182140baa744c84bb856d8cbabd7e1c4766d4a5ad4ef80e5656b0dd1be4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
