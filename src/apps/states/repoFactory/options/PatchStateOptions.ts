import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly extension: string;
  readonly etag: string;
  readonly stateId: string;
  readonly registration?: string;
  readonly activityId: string;
}

export default Options;
