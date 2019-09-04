import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

export default interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly since?: string;
}
