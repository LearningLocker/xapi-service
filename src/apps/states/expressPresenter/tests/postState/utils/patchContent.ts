import { Test } from 'supertest';
import patchState from './patchState';

export default (content: string, contentType: string, sendVersion = true): Test => {
  return patchState({}, content, contentType, sendVersion);
};
