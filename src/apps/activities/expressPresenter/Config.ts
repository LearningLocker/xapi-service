import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Tracker from 'jscommons/dist/tracker/Tracker';
import { FileStorageConfig } from '../_functions/deleteActivityProfile/utils/getFileStorageConfig/FileStorageConfig';
import { TrackingConfig } from '../_functions/deleteActivityProfile/utils/getTrackingConfig/TrackingConfig';
import { MongoRecordStorageConfig } from '../_functions/deleteActivityProfile/utils/getRecordStorageConfig/RecordStorageConfig';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  readonly service: Service;
  readonly translator: Translator;
  readonly tracker: Promise<Tracker>;
  readonly fileStorageConfig: FileStorageConfig;
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly trackingConfig: TrackingConfig;
}

export default Config;
