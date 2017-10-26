FROM node:8@sha256:6c126a8ade820355575812c43b72357a772ea9da42c52816c0e52bc56603171e
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
