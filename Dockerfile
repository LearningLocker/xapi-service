FROM node:8@sha256:14ce6bda461bf6785b2fef512196402f2adb7571511a4f3280058a9b2646176f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
