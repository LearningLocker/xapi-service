import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly profileId: string;
}

export default Options;
