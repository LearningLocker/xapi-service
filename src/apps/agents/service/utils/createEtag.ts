import sha1 from 'sha1';
import { v4 as uuid } from 'uuid';

export default () => {
  const id = uuid();
  const timestamp = (new Date()).toISOString();
  return sha1(`${id}-${timestamp}`);
};
