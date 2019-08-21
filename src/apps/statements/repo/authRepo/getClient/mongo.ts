import atob from 'atob';
import NoModel from 'jscommons/dist/errors/NoModel';
import { Db } from 'mongodb';
import ExpiredClientError from '../../../errors/ExpiredClientError';
import UntrustedClientError from '../../../errors/UntrustedClientError';
import Actor from '../../../models/Actor';
import ClientModel from '../../../models/ClientModel';
import parseJson from '../../../utils/parseJson';
import FacadeConfig from '../utils/mongoAuth/FacadeConfig';
import Signature from './Signature';

const findClientByAccessToken = async (db: Db, accessToken: string) => {
  const accessTokenDoc = await db.collection('oAuthTokens').findOne({
    accessToken,
  });
  if (!accessTokenDoc) {
    return null;
  }
  const clientDoc = await db.collection('client').findOne({
    _id: accessTokenDoc.clientId,
  });
  return clientDoc;
};

const findClientByBasicAuth = async (db: Db, encodedBasicAuthToken: string) => {
  const decodedAuthToken = atob(encodedBasicAuthToken);
  const splitAuthToken = decodedAuthToken.split(':');
  const [key, secret] = splitAuthToken;
  const clientDoc = await db.collection('client').findOne({
    'api.basic_key': key,
    'api.basic_secret': secret,
  });
  return clientDoc;
};

const findClientWithAuth = async (db: Db, authToken: string) => {
  const [authType, authValue] = authToken.split(' ');
  switch (authType) {
    case 'Basic':
      return findClientByBasicAuth(db, authValue);
    case 'Bearer':
      return findClientByAccessToken(db, authValue);
    default:
      throw new NoModel('Client');
  }
};

export default (config: FacadeConfig): Signature => {
  return async ({ authToken }) => {
    const db = await config.db();
    const clientDoc = await findClientWithAuth(db, authToken);

    if (clientDoc === null || clientDoc === undefined) {
      throw new NoModel('Client');
    }

    if (clientDoc.isTrusted === false) {
      throw new UntrustedClientError();
    }

    const [orgDoc, lrsDoc] = await Promise.all([
      db.collection('organisations').findOne({
        _id: clientDoc.organisation,
      }),
      db.collection('lrs').findOne({
        _id: clientDoc.lrs_id,
      }),
    ]);

    if (orgDoc === null || orgDoc === undefined || lrsDoc === null || lrsDoc === undefined) {
      throw new NoModel('Client');
    }

    if (orgDoc.expiration !== null && orgDoc.expiration < new Date()) {
      throw new ExpiredClientError();
    }

    const client: ClientModel = {
      _id: clientDoc._id.toString() as string,
      title: clientDoc.title as string,
      authority: parseJson(clientDoc.authority, ['client', 'authority']) as Actor,
      isTrusted: clientDoc.isTrusted as boolean,
      lrs_id: clientDoc.lrs_id.toString() as string,
      organisation: clientDoc.organisation.toString() as string,
      scopes: clientDoc.scopes as string[],
    };

    return { client };
  };
};
