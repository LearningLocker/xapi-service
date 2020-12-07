# xAPI service

[![Build Status](https://circleci.com/gh/LearningLocker/xapi-service/tree/master.svg?style=shield&circle-token=b6b0c9f734e6e7d76a59e8dcf9d0e05eb2fef542)](https://circleci.com/gh/LearningLocker/xapi-service)
[![Renovate badge](https://img.shields.io/badge/Renovate-enabled-brightgreen.svg)](https://renovateapp.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/LearningLocker/learninglocker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LearningLocker/learninglocker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*Learning Locker is a trademark of [Learning Pool](http://learningpool.com)*

### Development: Installation

Do not use sudo for any of these installations or commands. If you're working on Learning Locker Enterprise, please make sure you've followed the [Enterprise Development Setup](https://github.com/LearningLocker/enterprise/blob/master/README.md#development-setup) first.

#### Setup Repository

1. Change to your Documents directory (or whichever directory you want to contain the repository) with `cd ~/Documents`.
1. Clone the repository with `git clone git@github.com:LearningLocker/xapi-service.git`.
1. Switch to the repository directory with `cd xapi-service`.
1. Install dependencies with `yarn`.
1. Copy the ".env.example" file in the repository into a new ".env" file.
1. Build the code `yarn build` or `yarn build --watch` if you want to make changes.
1. Start Mongo and Redis with `docker-compose up -d`. If you've followed the [Enterprise setup instructions](https://github.com/LearningLocker/enterprise/blob/master/README.md) already you won't need to do this.
1. Run the server with `yarn start` or `yarn start:dev` if you want to make changes.

### Development: Testing

Before you follow these instructions you may want to exit your `yarn start` command above with Ctrl + C. This ensures that the running app doesn't interfere with your testing by using Mongo and Redis.

1. Install dependencies with `yarn`.
1. Start Mongo and Redis with `docker-compose up -d`. If you've followed the [Enterprise setup instructions](https://github.com/LearningLocker/enterprise/blob/master/README.md) already you won't need to do this.
1. Lint the code with `yarn lint`.
1. Build the code with `yarn build`.
1. Test the code with `yarn cover-ci`.
1. Stop the Mongo and Redis with `docker-compose down`. Use `-v` at the end to delete data.

### Production: Installation
To install all of Learning Locker, see the [installation documentation](http://docs.learninglocker.net/guides-installing/). To install just the xAPI service, you can follow the instructions below.

1. Clone the repository with `git clone git@github.com:LearningLocker/xapi-service.git`.
1. Switch to the repository directory with `cd xapi-service`.
1. Install dependencies with `yarn`.
1. Build the code with `yarn build`.
1. Start the server with `yarn start`.

### Docker
You can use the steps below to install and run the xAPI service.

- Create a ".env" file using the ".env.example" file in this Github repository.
- Pull the image from DockerHub `docker pull learninglocker/xapi-service:latest`.
- Run the image in a container `docker run -d -p 8080:80 --env-file .env learninglocker/xapi-service:latest`.
