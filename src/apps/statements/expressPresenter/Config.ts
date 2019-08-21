import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Tracker from 'jscommons/dist/tracker/Tracker';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  llClientInfoEndpoint: string;
  service: Service;
  translator: Translator;
  tracker: Promise<Tracker>;
  allowUndefinedMethod: boolean;
  allowFormBody: boolean;
}

export default Config;
