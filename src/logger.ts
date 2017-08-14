import commonWinston from 'jscommons/dist/winston';
import config from './config';

export default commonWinston({
  cloudWatch: {
    awsConfig: {
      accessKeyId: config.winston.cloudWatch.awsConfig.accessKeyId,
      region: config.winston.cloudWatch.awsConfig.region,
      secretAccessKey: config.winston.cloudWatch.awsConfig.secretAccessKey,
    },
    enabled: config.winston.cloudWatch.enabled,
    level: config.winston.cloudWatch.level,
    logGroupName: config.winston.cloudWatch.logGroupName,
    logStreamName: config.winston.cloudWatch.logStreamName,
  },
  console: {
    level: config.winston.console.level,
  },
});
