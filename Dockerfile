FROM node:8@sha256:717f84f9aa6a51a5c2914100812937261551e50a88f2323acc0b1d43a081b6e2
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
