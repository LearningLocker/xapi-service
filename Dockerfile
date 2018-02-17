FROM node:8@sha256:30627901c9b8b73d51468ed66ac72c6235012b30977df237d20ac64f814aa437
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
