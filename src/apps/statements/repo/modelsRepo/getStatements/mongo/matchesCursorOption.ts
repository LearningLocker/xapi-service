import { ObjectID } from 'mongodb';
import { Opts } from '../Signature';

export default (options: Opts): object => {
  if (options.cursor === undefined) {
    return {};
  }

  const [_id, stored] = options.cursor.split('_');
  const storedDate = new Date(stored);
  const oid = new ObjectID(_id);

  return {
    $or: [
      {
        _id: { [options.ascending ? '$gte' : '$lte']: oid },
        stored: storedDate,
      },
      { stored: { [options.ascending ? '$gt' : '$lt']: storedDate } },
    ],
  };
};
