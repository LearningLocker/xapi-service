import * as assert from 'assert';

import { getChoiceQuestionMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getChoiceQuestionMetadata';
import { multipleChoices, singleChoice } from './fixtures/choice-interaction.fixture';

describe('Retrieve choices metadata from statement', () => {
  it('should return choices metadata from statement', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getChoiceQuestionMetadata(
      {
        ...singleChoice,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should retrieve metadata from statement with one choice', () => {
    const actualSingleChoiceMetadata = getChoiceQuestionMetadata(singleChoice);
    const expectedSingleChoiceMetadata = {
      'https://learninglocker&46;net/choice-response': ['golf'],
    };

    assert.deepEqual(actualSingleChoiceMetadata, expectedSingleChoiceMetadata);
  });

  it('should retrieve metadata from statement with multiple choices', () => {
    const actualMultipleChoicesMetadata = getChoiceQuestionMetadata(multipleChoices);
    const expectedMultipleChoicesMetadata = {
      'https://learninglocker&46;net/choice-response': ['golf', 'tetris'],
    };

    assert
      .deepEqual(
        actualMultipleChoicesMetadata,
        expectedMultipleChoicesMetadata,
      );
  });
});
