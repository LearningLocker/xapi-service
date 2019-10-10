import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import getStatements from '../utils/mongoModels/getStatements';
import voidQuery from '../utils/mongoModels/voidQuery';
import Signature from './Signature';

interface Result { readonly statement: { readonly id: string }; }

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    if (ids.length === 0) {
      return [];
    }
    const query = {
      'statement.id': { $in: ids },
      ...voidQuery,
    };
    const project = { 'statement.id': 1 };
    const results = await getStatements({ config, query, project, client }) as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
