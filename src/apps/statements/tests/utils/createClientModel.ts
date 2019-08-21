import Actor from '../../models/Actor';
import ClientModel from '../../models/ClientModel';
import { ALL } from '../../utils/scopes';

const DEFAULT_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:authority@example.com',
};

export default (overrides: Partial<ClientModel> = {}): ClientModel => {
  return {
    _id: '5988f0f00000000000000002',
    title: 'test_title',
    organisation: '5988f0f00000000000000000',
    lrs_id: '5988f0f00000000000000001',
    authority: DEFAULT_AUTHORITY,
    isTrusted: true,
    scopes: [ALL],
    ...overrides,
  };
};
