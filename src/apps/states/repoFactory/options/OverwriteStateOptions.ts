import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly etag: string;
  readonly registration?: string;
  readonly stateId: string;
  readonly extension: string;
}

export default Options;
