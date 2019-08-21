import * as crypto from 'crypto';

export default (content: string) => {
  return crypto.createHmac('sha256', 'secret').update(content).digest('hex');
};
