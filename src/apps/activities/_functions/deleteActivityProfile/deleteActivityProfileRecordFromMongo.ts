import NoModel from 'jscommons/dist/errors/NoModel';
import { MongoClient, ObjectID } from 'mongodb';
import IfMatch from '../../errors/IfMatch';
import { MongoRecordStorageConfig } from './utils/getRecordStorageConfig/RecordStorageConfig';
import {
  MongoActivityProfileDoc,
  mongoActivityProfilesCollectionName,
} from './utils/mongoDocInterfaces/MongoActivityProfileDoc';

interface DeleteActivityProfileRecordOptions {
  readonly lrs_id: string;
  readonly organisation: string;
  readonly ifMatch?: string;
  readonly activityId: string;
  readonly profileId: string;
}

interface DeleteActivityProfileRecordResult {
  readonly id: string;
  readonly contentType: string;
  readonly extension: string;
}

export async function deleteActivityProfileRecordFromMongo(
  config: MongoRecordStorageConfig,
  opts: DeleteActivityProfileRecordOptions,
): Promise<DeleteActivityProfileRecordResult> {
  const client = new MongoClient(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(config.mongoDbName);
  const collection = db.collection<MongoActivityProfileDoc>(mongoActivityProfilesCollectionName);

  // Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency
  const etagFilter = (
    opts.ifMatch !== undefined
      ? { etag: opts.ifMatch }
      : {}
  );

  const profileFilter = {
    activityId: opts.activityId,
    lrs: new ObjectID(opts.lrs_id),
    organisation: new ObjectID(opts.organisation),
    profileId: opts.profileId,
  };

  // Deletes the document if it matches the profile and etag filters.
  const opResult = await collection.findOneAndDelete({
    ...profileFilter,
    ...etagFilter,
  });

  // Returns the result of the deletion if the document was deleted.
  const deletedDoc = opResult.value as MongoActivityProfileDoc | null;
  if (deletedDoc !== null) {
    await client.close();
    return {
      contentType: deletedDoc.contentType,
      extension: deletedDoc.extension,
      id: deletedDoc._id.toString(),
    };
  }

  // Attempts to find document without the ETag filter to determine if there was an ETag error.
  const foundDoc = await collection.findOne(profileFilter);
  await client.close();
  if (foundDoc !== null) {
    throw new IfMatch();
  }

  /* istanbul ignore next */
  throw new NoModel('Activity Profile');
}
