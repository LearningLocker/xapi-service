import * as modr from '../../../utils/modr';

const obj = (defaultObjectType: string) => {
  return modr.modifySchema({
    objectType: modr.defaultValue(() => defaultObjectType),
  });
};

const members: modr.Modifier = modr.modifySchema({
  // tslint:disable-next-line:no-use-before-declare
  member: modr.modifyCollection(() => actor),
});

const agent = obj('Agent');
const group = modr.composeModifiers([
  obj('Group'),
  members,
]);
const activity = obj('Activity');
const actor = modr.composeModifiers([agent, group]);

const contextActivities = modr.modifySchema({
  parent: modr.modifyCollection(() => activity),
  grouping: modr.modifyCollection(() => activity),
  category: modr.modifyCollection(() => activity),
  other: modr.modifyCollection(() => activity),
});

const context = modr.modifySchema({
  team: group,
  instructor: agent,
  contextActivities,
});

const subStatement: modr.Modifier = modr.modifyType(Object, (data) => {
  return (
    data.objectType === 'SubStatement' ?
      // tslint:disable-next-line:no-use-before-declare
      statementBase(data) :
      data
  );
});

const object = modr.composeModifiers([activity, actor, subStatement]);
const statementBase = modr.modifySchema({ actor, object, context });

export default (model: any): any => {
  return statementBase(model);
};
