import { isUndefined, pickBy } from 'lodash';

const not = <V>(f: (value: V) => boolean) => (v: V): boolean => !f(v);

export default <T extends object>(obj: T) => pickBy<T>(obj, not(isUndefined));
