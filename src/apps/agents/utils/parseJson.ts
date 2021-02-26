import JsonSyntaxError from '../errors/JsonSyntaxError';

export default (data: string, path: string[]) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    /* istanbul ignore else - Not expecting other errors. */
    if (err instanceof SyntaxError) {
      throw new JsonSyntaxError(path);
    }
    /* istanbul ignore next - Not expecting other errors. */
    throw err;
  }
};
