import commonWinston from 'jscommons/dist/winston';
import { LoggerInstance } from 'winston';
import config from './config';

const logger: LoggerInstance = commonWinston({
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

export default logger;
