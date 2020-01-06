import * as assert from 'assert';

import getMetadataFromStatement
  from '../../../../service/storeStatements/queriables/getMetadataFromStatement';
import { multipleChoices } from './fixtures/choice-interaction.fixture';
import { multipleMatchingQuestions } from './fixtures/matching-interaction.fixture';
import { multipleItemsSequence } from './fixtures/sequencing-interaction.fixture';
import { statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve metadata from statement', () => {
  it('should retrieve metadata from statement', () => {
    const actualDurationMetadata = getMetadataFromStatement(statementDefaults);
    const expectedDurationMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
    };

    assert.deepEqual(actualDurationMetadata, expectedDurationMetadata);

    // ----------------------------------------------------------------------------------------

    const actualSequencingMetadata = getMetadataFromStatement(multipleItemsSequence);
    const expectedSequencingMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualSequencingMetadata, expectedSequencingMetadata);

    // ----------------------------------------------------------------------------------------

    const actualChoiceMetadata = getMetadataFromStatement(multipleChoices);
    const expectedChoiceMetadata = {
      'https://learninglocker&46;net/choice-response': ['golf', 'tetris'],
      'https://learninglocker&46;net/result-duration': { seconds: 3 },
    };

    assert.deepEqual(actualChoiceMetadata, expectedChoiceMetadata);

    // ----------------------------------------------------------------------------------------

    const actualMatchingQuestionsMetadata = getMetadataFromStatement(multipleMatchingQuestions);
    const expectedMatchingQuestionsMetadata = {
      'https://learninglocker&46;net/matching-response': [
        ['ben', '3'],
        ['chris', '2'],
        ['troy', '4'],
        ['freddie', '1'],
      ],
    };

    assert.deepEqual(actualMatchingQuestionsMetadata, expectedMatchingQuestionsMetadata);
  });
});
