import patchProfile from './patchProfile';

export default async (content: string, contentType: string) => {
  await patchProfile({ contentType }, content);
};
