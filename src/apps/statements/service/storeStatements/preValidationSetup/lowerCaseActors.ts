import * as modr from '../../../utils/modr';
import Config from '../../Config';

const lowerCaseString = modr.modifyType(String, (data: string) => {
  return data.toLowerCase();
});

const lowerCaseIfis = modr.modifySchema({
  mbox: lowerCaseString,
  openid: lowerCaseString,
  account: modr.modifySchema({
    name: lowerCaseString,
    homePage: lowerCaseString,
  }),
  member: modr.modifyCollection(() => lowerCaseIfis),
});

const lowerCaseIfisInObject = modr.modifyType(Object, (data: any) => {
  if (data.objectType === 'SubStatement') {
    return modr.modifySchema({
      actor: lowerCaseIfis,
      object: lowerCaseIfis,
      context: modr.modifySchema({
        instructor: lowerCaseIfis,
      }),
    })(data);
  }
  return lowerCaseIfis(data);
});

export const lowerCaseActors = (config: Config) => {
  if (!config.enableActorLowerCasing) {
    return modr.keepValue;
  }
  return modr.modifySchema({
    actor: lowerCaseIfis,
    object: lowerCaseIfisInObject,
    context: modr.modifySchema({
      instructor: lowerCaseIfis,
    }),
  });
};
