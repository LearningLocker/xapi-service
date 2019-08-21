import voidVerbId from '../../utils/voidVerbId';
import createStatement from '../utils/createStatement';

export default (objectId: string, id?: string): any => {
  return createStatement({
    ...(
      id === undefined ? {} :
      { id }
    ),
    verb: {
      id: voidVerbId,
    },
    object: {
      objectType: 'StatementRef',
      id: objectId,
    },
  });
};
