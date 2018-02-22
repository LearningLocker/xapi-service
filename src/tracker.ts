import fakeTracker from 'jscommons/dist/tracker/fake';
import newRelicTracker from 'jscommons/dist/tracker/newrelic';
import Tracker from 'jscommons/dist/tracker/Tracker';
import config from './config';

/* istanbul ignore next */
const trackerFactory = async (): Promise<Tracker> => {
  if (config.tracker.newRelic.enabled) {
    process.env.NEW_RELIC_NO_CONFIG_FILE = config.tracker.newRelic.noConfigFile;
    process.env.NEW_RELIC_LOG = config.tracker.newRelic.log;
    process.env.NEW_RELIC_LOG_LEVEL = config.tracker.newRelic.logLevel;
    process.env.NEW_RELIC_API_CUSTOM_ATTRIBUTES = 'true';
    return newRelicTracker();
  }
  return fakeTracker;
};

export default trackerFactory();
