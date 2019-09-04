import Agent from './Agent';

interface Model {
  readonly etag: string;
  readonly id: string;
  readonly organisation: string;
  readonly agent: Agent;
  readonly profileId: string;
  readonly extension: string;
  readonly content?: any;
  readonly contentType: string;
  readonly lrs: string;
  readonly updatedAt: Date;
}

export default Model;
