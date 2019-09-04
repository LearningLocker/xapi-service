import { Test } from 'supertest';
import patchProfile from './patchProfile';

export default (content: string, contentType: string): Test => {
  return patchProfile({}, content, contentType);
};
