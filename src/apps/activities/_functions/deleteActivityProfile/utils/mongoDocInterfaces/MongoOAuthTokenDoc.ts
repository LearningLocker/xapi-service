import { ObjectID } from 'mongodb';
export interface MongoOAuthTokenDoc {
  readonly _id: ObjectID;
  readonly clientId: ObjectID;
  readonly accessToken: string;
}
export const mongoOAuthTokenCollectionName = 'oAuthTokens';
