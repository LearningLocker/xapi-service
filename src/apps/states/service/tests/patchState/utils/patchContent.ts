import patchState from './patchState';

export default async (content: string, contentType: string) => {
  await patchState({ contentType }, content);
};
