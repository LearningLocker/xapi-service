const git = require('simple-git/promise')();
const rimraf = require('rimraf');
const { promisify } = require('util');
const shelljs = require('shelljs');
const { join } = require('path');
const package = require(join(process.cwd(), 'package.json'));

(async () => {
  const exec = (command) => {
    return new Promise((resolve, reject) => {
      shelljs.exec(command, (code, stdout, stderr) => {
        if (code !== 0) {
          reject(stderr);
          return;
        }
        console.log(stdout);
        resolve(stdout);
      });
    });
  };
  await git.fetch();
  await git.checkout('master');
  await git.pull();
  await promisify(rimraf)(join(process.cwd(), 'node_modules'));
  await exec('yarn install --ignore-engines');
  await exec('npm i @learninglocker/xapi-activities@latest');
  await exec('npm i @learninglocker/xapi-agents@latest');
  await exec('npm i @learninglocker/xapi-state@latest');
  await exec('npm i @learninglocker/xapi-statements@latest');
  await exec('yarn add --ignore-engines @learninglocker/xapi-activities@latest');
  await exec('yarn add --ignore-engines @learninglocker/xapi-agents@latest');
  await exec('yarn add --ignore-engines @learninglocker/xapi-state@latest');
  await exec('yarn add --ignore-engines @learninglocker/xapi-statements@latest');
  await git.deleteLocalBranch('xapi-deps');
  await git.checkoutLocalBranch('xapi-deps');
})().catch((err) => {
  console.error(err);
});