import { isArray, isNull, isPlainObject, mapValues, omitBy, reject } from 'lodash';
import Config from '../../Config';

const removeNulls = (data: any): any => {
  if (isPlainObject(data)) {
    return mapValues(omitBy(data, isNull), removeNulls);
  }
  if (isArray(data)) {
    return reject(data, isNull).map(removeNulls);
  }
  return data;
};

export default (config: Config) => {
  return (data: any) => {
    /* istanbul ignore next */
    if (!config.enableNullRemoval) { return data; }

    return removeNulls(data);
  };
};
