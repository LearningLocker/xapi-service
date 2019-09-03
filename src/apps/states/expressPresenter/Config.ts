import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Tracker from 'jscommons/dist/tracker/Tracker';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  readonly service: Service;
  readonly translator: Translator;
  readonly tracker: Promise<Tracker>;
}

export default Config;
