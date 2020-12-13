import { ObjectID } from 'mongodb';
import { JsonValue } from '../JsonValue';

export interface MongoActivityProfileDoc {
  readonly _id: ObjectID;
  readonly etag: string;
  readonly id: string;
  readonly organisation: ObjectID;
  readonly activityId: string;
  readonly profileId: string;
  readonly content?: JsonValue;
  readonly contentType: string;
  readonly extension: string;
  readonly lrs: ObjectID;
  readonly updatedAt: Date;
}

export const mongoActivityProfilesCollectionName = 'activityProfiles';
