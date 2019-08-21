import Verb from '../../../models/Verb';
import formatLangMap from './langMap';

export default (verb: Verb, langs: string[]): Verb => {
  return {
    ...verb,
    ...(
      verb.display === undefined ? {} :
      { display: formatLangMap(verb.display, langs) }
    ),
  };
};
