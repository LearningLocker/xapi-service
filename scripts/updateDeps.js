const git = require('simple-git/promise')();
const rimraf = require('rimraf');
const { promisify } = require('util');
const shelljs = require('shelljs');
const colors = require('colors');
const { join } = require('path');

const getCommitMessage = () => {
  const package = require(join(process.cwd(), 'package.json'));
  const getDepMessage = (dep) => {
    const versionRange = package.dependencies[`@learninglocker/xapi-${dep}`];
    const version = versionRange.replace('^', 'v');
    const releaseLink = `https://github.com/LearningLocker/xapi-${dep}/releases/tag/${version}`;
    return `[${dep} ${version}](${releaseLink})`;
  };
  const semverMessage = process.argv[2];
  const deps = ['activities', 'agents', 'state', 'statements'];
  const depsMessage = deps.map(getDepMessage).join(', ');
  return `${semverMessage} Includes ${depsMessage}.`;
};

const exec = (command) => {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan(`Starting: ${command}`));
    const child = shelljs.exec(command, { async: true }, (code) => {
      if (code !== 0) {
        console.log(colors.cyan(`Completed unsuccessfully: ${command}`));
        reject(new Error());
        return;
      }
      console.log(colors.cyan(`Completed successfully: ${command}`));
      resolve();
    });
  });
};

const main = async () => {
  await git.fetch();
  await git.checkout('master');
  await git.pull();
  await exec('git branch -D xapi-deps');
  await git.checkoutLocalBranch('xapi-deps');
  await promisify(rimraf)(join(process.cwd(), 'node_modules'));
  await exec('yarn install --ignore-engines');
  await exec('npm i @learninglocker/xapi-activities@latest @learninglocker/xapi-agents@latest @learninglocker/xapi-state@latest @learninglocker/xapi-statements@latest');
  await exec('yarn add --ignore-engines @learninglocker/xapi-activities@latest @learninglocker/xapi-agents@latest @learninglocker/xapi-state@latest @learninglocker/xapi-statements@latest');
  await git.add('./*');
  await git.commit(getCommitMessage());
  await git.push('origin', 'xapi-deps');
};

main().then(() => {
  console.log(colors.green('Completed successfully'));
}).catch((err) => {
  console.error(colors.red(err));
  console.log(colors.red('Completed unsuccessfully'));
});
// node scripts/updateDeps.js "fix: message"
