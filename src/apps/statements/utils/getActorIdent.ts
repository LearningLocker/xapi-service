import FilterAgent from '../models/FilterAgent';

export default (actor: FilterAgent): string => {
  if (actor.mbox !== undefined) {
    return actor.mbox;
  } else if (actor.account !== undefined) {
    return `${actor.account.homePage}|${actor.account.name}`;
  } else if (actor.openid !== undefined) {
    return actor.openid;
  } else if (actor.mbox_sha1sum !== undefined) {
    return actor.mbox_sha1sum;
  }
  throw new Error('Expected an identifier');
};
