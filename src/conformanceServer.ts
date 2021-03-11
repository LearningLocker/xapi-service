import './server'; // eslint-disable-line import/no-unassigned-import
import { ObjectID } from 'mongodb';
import connectToMongoDb from './utils/connectToMongoDb';

const testOrg = {
  _id: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  name: 'Test Org',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
const testStore = {
  _id: new ObjectID('5988f0f00000000000000001'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  description: 'Test LRS Description',
  organisation: testOrg._id,
  statementCount: 0,
  title: 'Test LRS',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
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
  lrs_id: testStore._id,
  organisation: testOrg._id,
  scopes: ['xapi/all', 'all'],
  title: 'Conformance Tests',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};

(async () => {
  const db = await connectToMongoDb()();
  console.info('Dropping database for ADL conformance tests.');
  await db.dropDatabase();
  console.info('Seeding database for ADL conformance tests.');
  await db.collection('organisations').insertOne(testOrg);
  await db.collection('lrs').insertOne(testStore);
  await db.collection('client').insertOne(testClient);
})()
  .then(() => {
    console.info('Completed seeding for ADL conformance tests.');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
