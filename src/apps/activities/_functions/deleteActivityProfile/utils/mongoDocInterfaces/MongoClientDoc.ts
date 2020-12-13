import { ObjectID } from 'mongodb';
import Actor from 'src/apps/statements/models/Actor';

export interface MongoClientDoc {
  readonly _id: ObjectID;
  readonly api: {
    readonly basic_key: string;
    readonly basic_secret: string;
  };
  readonly isTrusted: boolean;
  readonly lrs_id: ObjectID;
  readonly organisation: ObjectID;
  readonly scopes: string[];
  readonly title: string;
  readonly authority: Actor;
}
export const mongoClientCollectionName = 'client';
