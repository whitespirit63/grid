import { createHash } from 'crypto';

export const sha256 = (str) => {
  const nonce = 'secret'
  return createHash('sha256').update(nonce + str).digest('hex');
};
