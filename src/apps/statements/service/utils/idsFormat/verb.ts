import IdFormattedVerb from '../../../models/IdFormattedVerb';
import Verb from '../../../models/Verb';

export default (verb: Verb): IdFormattedVerb => {
  return {
    id: verb.id,
  };
};
