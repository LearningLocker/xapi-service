import assert from 'assert';
import getFileExtension from '../utils/getFileExtension';

describe('getFileExtension', () => {

  it('should return known extension', async () => {
    const ext = getFileExtension('text/plain');
    assert.equal(ext, 'txt');
  });

  it('should return `bin` on unknown extension', async () => {
    const ext = getFileExtension('ht2/binary');
    assert.equal(ext, 'bin');
  });
});
