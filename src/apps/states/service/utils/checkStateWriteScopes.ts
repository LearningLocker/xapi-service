import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { STATE_WRITE_SCOPES } from '../../utils/scopes';

export default (scopes: string[]) => {
  checkScopes(STATE_WRITE_SCOPES, scopes);
};
