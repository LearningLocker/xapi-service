import { ObjectID } from 'mongodb';
export interface MongoLrsDoc {
  readonly _id: ObjectID;
}
export const mongoLrsCollectionName = 'lrs';
