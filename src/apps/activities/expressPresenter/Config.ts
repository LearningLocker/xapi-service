import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Tracker from 'jscommons/dist/tracker/Tracker';
import { AuthConfig } from '../_functions/deleteActivityProfile/utils/getAuthConfig/AuthConfig';
import { FileStorageConfig } from '../_functions/deleteActivityProfile/utils/getFileStorageConfig/FileStorageConfig';
import { MongoRecordStorageConfig } from '../_functions/deleteActivityProfile/utils/getRecordStorageConfig/RecordStorageConfig';
import { TrackingConfig } from '../_functions/deleteActivityProfile/utils/getTrackingConfig/TrackingConfig';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  readonly service: Service;
  readonly translator: Translator;
  readonly tracker: Promise<Tracker>;
  readonly authConfig: AuthConfig;
  readonly fileStorageConfig: FileStorageConfig;
  readonly recordStorageConfig: MongoRecordStorageConfig;
  readonly trackingConfig: TrackingConfig;
}

export default Config;
