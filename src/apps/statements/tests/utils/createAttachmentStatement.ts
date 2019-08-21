import createStatement from './createStatement';

export default (attachments: any[], id?: string) => {
  return createStatement({
    ...(
      id === undefined ? {} :
      { id }
    ),
    attachments,
  });
};
