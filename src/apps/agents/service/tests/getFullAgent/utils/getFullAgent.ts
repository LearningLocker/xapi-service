import GetFullAgentOptions from '../../../../serviceFactory/options/GetFullAgentOptions';
import GetFullAgentResult from '../../../../serviceFactory/results/GetFullAgentResult';
import service from '../../../../utils/testService';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
} from '../../../../utils/testValues';

export default async (
  optsOverrides: Partial<GetFullAgentOptions> = {},
): Promise<GetFullAgentResult> => {
  return service.getFullAgent({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    ...optsOverrides,
  });
};
