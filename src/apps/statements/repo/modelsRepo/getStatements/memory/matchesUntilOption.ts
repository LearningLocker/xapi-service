import Statement from '../../../../models/Statement';
import { Opts } from '../Signature';

export default (statement: Statement, opts: Opts): boolean => {
  return (
    opts.until === undefined ? true :
      statement.stored <= opts.until
  );
};
