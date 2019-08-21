import { difference } from 'lodash';
import UnknownParams from '../../errors/UnknownParams';

export default (queryParams: any, knownParams: string[]) => {
  const givenParams = Object.keys(queryParams);
  const unknownParams = difference(givenParams, knownParams);

  if (unknownParams.length > 0) {
    throw new UnknownParams(unknownParams);
  }
};
