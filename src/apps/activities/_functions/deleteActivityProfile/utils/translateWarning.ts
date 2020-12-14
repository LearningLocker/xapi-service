import XapiTypeWarning from '@learninglocker/xapi-validation/dist/warnings/TypeWarning';
import stringPath from 'jscommons/dist/translatorFactory/utils/stringPath';
import { RequiredWarning, RestrictedKeysWarning, TypeWarning, Warning } from 'rulr';

export function translateWarning(warning: Warning) {
  if (warning instanceof XapiTypeWarning) {
    const path = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Expected ${warning.typeName} in ${path}. Received '${dataString}'`;
  }
  if (warning instanceof TypeWarning) {
    const path = stringPath(warning.path);
    const typeName = warning.type.name;
    const dataString = JSON.stringify(warning.data);
    return `Expected '${path}' to be '${typeName}'. Received '${dataString}'`;
  }
  if (warning instanceof RequiredWarning) {
    const path = stringPath(warning.path);
    return `Missing required value in '${path}'`;
  }
  if (warning instanceof RestrictedKeysWarning) {
    const path = stringPath(warning.path);
    const keys = warning.keys.join(', ');
    return `Unknown keys (${keys}) set in '${path}'`;
  }
  {
    const path = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Problem in '${path}'. Received '${dataString}'`;
  }
}
