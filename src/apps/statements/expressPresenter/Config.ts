import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Tracker from 'jscommons/dist/tracker/Tracker';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  readonly llClientInfoEndpoint: string;
  readonly service: Service;
  readonly translator: Translator;
  readonly tracker: Promise<Tracker>;
  readonly allowUndefinedMethod: boolean;
  readonly allowFormBody: boolean;
}

export default Config;
