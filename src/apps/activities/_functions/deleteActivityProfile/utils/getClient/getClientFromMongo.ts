import atob from 'atob';
import NoModel from 'jscommons/dist/errors/NoModel';
import { Db, MongoClient } from 'mongodb';
import ExpiredClientError from '../../../../errors/ExpiredClientError';
import UntrustedClientError from '../../../../errors/UntrustedClientError';
import { MongoRecordStorageConfig } from '../getRecordStorageConfig/RecordStorageConfig';
import { mongoClientCollectionName, MongoClientDoc } from '../mongoDocInterfaces/MongoClientDoc';
import { mongoLrsCollectionName, MongoLrsDoc } from '../mongoDocInterfaces/MongoLrsDoc';
import { mongoOAuthTokenCollectionName, MongoOAuthTokenDoc } from '../mongoDocInterfaces/MongoOAuthTokenDoc';
import { mongoOrgCollectionName, MongoOrgDoc } from '../mongoDocInterfaces/MongoOrgDoc';

async function findClientByAccessToken(db: Db, accessToken: string) {
  const accessTokenCollection = db.collection<MongoOAuthTokenDoc>(mongoOAuthTokenCollectionName);
  const accessTokenDoc = await accessTokenCollection.findOne({
    accessToken,
  });
  if (accessTokenDoc === null) {
    return null;
  }
  const clientCollection = db.collection<MongoClientDoc>(mongoClientCollectionName);
  const clientDoc = await clientCollection.findOne({
    _id: accessTokenDoc.clientId,
  });
  return clientDoc;
}

async function findClientByBasicAuth(db: Db, encodedBasicAuthToken: string) {
  const decodedAuthToken = atob(encodedBasicAuthToken);
  const splitAuthToken = decodedAuthToken.split(':');
  const [key, secret] = splitAuthToken;
  const clientCollection = db.collection<MongoClientDoc>(mongoClientCollectionName);
  const clientDoc = await clientCollection.findOne({
    'api.basic_key': key,
    'api.basic_secret': secret,
  });
  return clientDoc;
}

async function findClientWithAuth(db: Db, authToken: string) {
  const [authType, authValue] = authToken.split(' ');
  switch (authType) {
    case 'Basic':
      return findClientByBasicAuth(db, authValue);
    case 'Bearer':
      return findClientByAccessToken(db, authValue);
    default:
      throw new NoModel('Client');
  }
}

export async function getClientFromMongo(config: MongoRecordStorageConfig, authToken: string) {
  const mongoClient = new MongoClient(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await mongoClient.connect();
    const db = mongoClient.db(config.mongoDbName);
    const clientDoc = await findClientWithAuth(db, authToken);

    if (clientDoc === null) {
      throw new NoModel('Client');
    }

    if (!clientDoc.isTrusted) {
      throw new UntrustedClientError();
    }

    const orgCollection = db.collection<MongoOrgDoc>(mongoOrgCollectionName);
    const lrsCollection = db.collection<MongoLrsDoc>(mongoLrsCollectionName);
    const orgDoc = await orgCollection.findOne({ _id: clientDoc.organisation });
    const lrsDoc = await lrsCollection.findOne({ _id: clientDoc.lrs_id });

    if (orgDoc === null || lrsDoc === null) {
      throw new NoModel('Client');
    }

    if (orgDoc.expiration !== null && orgDoc.expiration < new Date()) {
      throw new ExpiredClientError();
    }

    const client = {
      _id: clientDoc._id.toString(),
      isTrusted: clientDoc.isTrusted,
      lrs_id: clientDoc.lrs_id.toString(),
      organisation: clientDoc.organisation.toString(),
      scopes: clientDoc.scopes,
      title: clientDoc.title,
      authority: clientDoc.authority,
    };

    await mongoClient.close();
    return client;
  } catch (err) {
    await mongoClient.close();
    throw err;
  }
}
