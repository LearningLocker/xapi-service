FROM node:8@sha256:4c43091f426f1a630c3db3acb6f2eaf940e50eafe4d08ddc53f4d5832ba9958d
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production --ignore-engines
COPY dist dist

EXPOSE 80
CMD ["yarn", "start"]
