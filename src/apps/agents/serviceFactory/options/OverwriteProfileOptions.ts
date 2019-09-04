import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

export default interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: NodeJS.ReadableStream;
  readonly contentType: string;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
  readonly profileId: string;
}
