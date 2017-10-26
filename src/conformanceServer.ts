// tslint:disable:no-console
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import { MongoClient, ObjectID } from 'mongodb';
import config from './config';
import './server'; // tslint:disable-line:no-import-side-effect

const testClient = {
  api: {
    basic_key: 'AAA',
    basic_secret: 'BBB',
  },
  authority: JSON.stringify({
    mbox: 'mailto:hello@learninglocker.net',
    name: 'New Client',
    objectType: 'Agent',
  }),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  isTrusted: true,
  lrs_id: new ObjectID('5901bc9c81a4a731c2dec4f0'),
  organisation: new ObjectID('58fe13e34effd3c26a7fc4b6'),
  scopes: ['xapi/all', 'all'],
  title: 'Conformance Tests',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};

(async () => {
  const db = MongoClient.connect(config.mongoModelsRepo.url);
  const collection = (await db).collection('client');
  console.log('Removing clients for ADL conformance tests.');
  await collection.deleteMany({});
  console.log('Inserting test client for ADL conformance tests.');
  await collection.insertOne(testClient);
})().then(() => {
  console.log('Completed seeding for ADL conformance tests.');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
