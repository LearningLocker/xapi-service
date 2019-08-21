import createStatement from './createStatement';
import createSubStatement from './createSubStatement';

export default (attachments: any[], id?: string) => {
  return createStatement({
    ...(
      id === undefined ? {} :
      { id }
    ),
    ...createSubStatement({
      attachments,
    }),
  });
};
