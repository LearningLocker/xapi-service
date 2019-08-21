import LanguageMap from '../../../models/LanguageMap';

export default (langMap: LanguageMap, langs: string[]): LanguageMap => {
  return langs.reduce((formattedLangMap, lang) => {
    if (langMap[lang] !== undefined) {
      return { [lang]: langMap[lang] };
    }
    return formattedLangMap;
  }, langMap);
};
