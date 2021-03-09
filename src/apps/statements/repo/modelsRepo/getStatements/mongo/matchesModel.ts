import { Opts } from '../Signature';

export type Matcher<Option> = (opt: Option, opts: Opts) => any;
export type Getter<Option> = (opts: Opts) => Option | undefined;
export type ModelMatcher = (opts: Opts) => any;

export default <Option>(matcher: Matcher<Option>, getter: Getter<Option>): ModelMatcher => {
  return (opts) => {
    const opt = getter(opts);
    return opt === undefined ? {} : matcher(opt, opts);
  };
};
