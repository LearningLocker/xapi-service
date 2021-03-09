import { isUndefined, pickBy } from 'lodash';

const not = <V>(f: (value: V) => boolean) => (v: V): boolean => !f(v);

export default <T extends Record<string, unknown>>(obj: T) => pickBy<T>(obj, not(isUndefined));
