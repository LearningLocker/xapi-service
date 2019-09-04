import * as assert from 'assert';
import { Warnings } from 'rulr';
import validateAgent from '../../utils/validateAgent';

describe('validateAgent', () => {
  const assertWarnings = (agent: any) => {
    try {
      validateAgent(agent);
    } catch (err) {
      const actualConstructor = err.constructor;
      assert.equal(actualConstructor, Warnings);
    }
  };

  it('should throw an error when using an invalid mbox value', () => {
    assertWarnings({ mbox: 'test@example.org' });
  });

  it('should throw an error when using an invalid mbox_sha1sum value', () => {
    assertWarnings({ mbox_sha1sum: 'test@example.org' });
  });

  it('should throw an error when using an invalid openid value', () => {
    assertWarnings({ openid: 'www.example.org' });
  });

  it('should throw an error when using an invalid homePage value', () => {
    assertWarnings({ account: {
      homePage: 'www.example.org',
      name: 'dummy_account_name',
    } });
  });

  it('should throw an error when using an invalid name type', () => {
    assertWarnings({ account: {
      homePage: 'http://www.example.org',
      name: 10,
    } });
  });

  it('should throw an error when using an invalid homePage value and name type', () => {
    assertWarnings({ account: {
      homePage: 'www.example.org',
      name: 10,
    } });
  });

  it('should throw an error when using an invalid mbox type', () => {
    assertWarnings({ mbox: 10 });
  });

  it('should throw an error when using an invalid mbox_sha1sum type', () => {
    assertWarnings({ mbox_sha1sum: 10 });
  });

  it('should throw an error when using an invalid openid type', () => {
    assertWarnings({ openid: 10 });
  });

  it('should throw an error when using an invalid homePage type', () => {
    assertWarnings({ account: {
      homePage: 10,
      name: 'dummy_account_name',
    } });
  });

  it('should throw an error when using an invalid homePage type and name type', () => {
    assertWarnings({ account: {
      homePage: 10,
      name: 10,
    } });
  });

  it('should throw an error when using too many IFIs', () => {
    assertWarnings({
      mbox: 'mailto:test@example.org',
      openid: 'http://www.example.org',
    });
  });

  it('should throw an error when using no IFIs', () => {
    assertWarnings({});
  });

  it('should throw an error when using an invalid IFI', () => {
    assertWarnings({ foo: 'bar' });
  });
});
