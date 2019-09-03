import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly registration?: string;
}

export default Options;
