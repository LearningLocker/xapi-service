FROM node:8@sha256:fb73805dca8b89c5a4b926a10ad7ba8359990088f8036e776d56165ea0b04e25
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
