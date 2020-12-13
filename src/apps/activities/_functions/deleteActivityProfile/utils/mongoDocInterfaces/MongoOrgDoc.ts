import { ObjectID } from 'mongodb';
export interface MongoOrgDoc {
  readonly _id: ObjectID;
  readonly expiration: Date | null;
}
export const mongoOrgCollectionName = 'organisation';
