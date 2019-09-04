import Agent from './Agent';

interface Model {
  readonly activityId: string;
  readonly agent: Agent;
  readonly content?: any;
  readonly contentType: string;
  readonly extension: string;
  readonly etag: string;
  readonly id: string;
  readonly lrs: string;
  readonly organisation: string;
  readonly registration?: string;
  readonly stateId: string;
  readonly updatedAt: Date;
}

export default Model;
