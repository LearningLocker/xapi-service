import TypeWarning from '@learninglocker/xapi-validation/dist/warnings/TypeWarning';
import commonTranslateWarning from 'jscommons/dist/expressPresenter/utils/translateWarning';
import { Warning } from 'rulr';
import Translator from '../../translatorFactory/Translator';

export default (translator: Translator, warning: Warning) => {
  switch (warning.constructor) {
    case TypeWarning:
      return translator.xapiTypeWarning(warning as TypeWarning);
    default:
      return commonTranslateWarning(translator, warning);
  }
};
