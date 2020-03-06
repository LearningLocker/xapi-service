import * as assert from 'assert';
import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';
import matchesCursorOption from './matchesCursorOption';

describe('memory matchesCursorOption', () => {
  it('should match when there is no cursor', () => {
    const options = { ascending: true } as Opts;
    const model = { _id: '1' } as StoredStatementModel;

    assert.equal(matchesCursorOption(model, options), true);
  });

  it('should match by cursor properly when ascending', () => {
    const options = { cursor: '2', ascending: true } as Opts;
    const modelAfterCursor = { _id: '3' } as StoredStatementModel;
    const modelBeforeCursor = { _id: '1' } as StoredStatementModel;

    assert.equal(matchesCursorOption(modelAfterCursor, options), true);
    assert.equal(matchesCursorOption(modelBeforeCursor, options), false);
  });

  it('should match by cursor properly when descending', () => {
    const options = { cursor: '2', ascending: false } as Opts;
    const modelAfterCursor = { _id: '3' } as StoredStatementModel;
    const modelBeforeCursor = { _id: '1' } as StoredStatementModel;

    assert.equal(matchesCursorOption(modelBeforeCursor, options), true);
    assert.equal(matchesCursorOption(modelAfterCursor, options), false);
  });
});
