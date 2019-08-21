import * as modr from '../../../utils/modr';

const wrapObjectInArray = modr.modifyType(Object, (data) => {
  return [data];
});

const modifyContext = modr.modifySchema({
  contextActivities: modr.modifySchema({
    parent: wrapObjectInArray,
    grouping: wrapObjectInArray,
    category: wrapObjectInArray,
    other: wrapObjectInArray,
  }),
});

const modifySubStatement = modr.modifySchema({
  context: modifyContext,
});

export const wrapContextActivitiesInArrays = modr.modifySchema({
  context: modifyContext,
  object: modr.modifyType(Object, (data) => {
    return (data.objectType === 'SubStatement'
      ? modifySubStatement(data)
      : data);
  }),
});
