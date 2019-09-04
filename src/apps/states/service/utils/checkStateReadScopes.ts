import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { STATE_READ_SCOPES } from '../../utils/scopes';

export default (scopes: string[]) => {
  checkScopes(STATE_READ_SCOPES, scopes);
};
