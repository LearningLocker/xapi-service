import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly content: any;
  readonly contentType: string;
  readonly etag: string;
  readonly extension: string;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
  readonly activityId: string;
  readonly profileId: string;
}

export default Options;
