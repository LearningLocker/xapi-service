import * as assert from 'assert';
import { ObjectID } from 'mongodb';
import { Opts } from '../Signature';
import matchesCursorOption from './matchesCursorOption';

describe('mongo matchesCursorOption', () => {
  it('should return cursor properly', () => {
    const testId = '5bae32485e331207f3d8e005';
    const testStored = new Date();
    const cursor = `${testId}_${testStored.toISOString()}`;

    assert
      .deepEqual(
        matchesCursorOption({ cursor: undefined } as Opts),
        {},
      );

    assert
      .deepEqual(
        matchesCursorOption({ cursor, ascending: true } as Opts),
        {
          $or: [
            {
              _id: { $gte: new ObjectID(testId) },
              stored: testStored,
            },
            { stored: { $gt: testStored } },
          ],
        },
      );

    assert
      .deepEqual(
        matchesCursorOption({ cursor, ascending: false } as Opts),
        {
          $or: [
            {
              _id: {
                $lte: new ObjectID(testId),
              },
              stored: testStored,
            },
            {
              stored: {
                $lt: testStored,
              },
            },
          ],
        },
      );
  });
});
