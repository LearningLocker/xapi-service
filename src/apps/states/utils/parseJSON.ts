import JsonSyntaxError from '../errors/JsonSyntaxError';

export default (data: string, path: string[]) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new JsonSyntaxError(path);
    }
  }
};
