import createSha from './createSha';

export default (content: string, fileUrl?: string): any => {
  return {
    usageType: 'http://adlnet.gov/expapi/attachments/signature',
    display: {},
    contentType: 'application/octet-stream',
    sha2: createSha(content),
    length: 0,
    ...(
      fileUrl === undefined ? {} :
      { fileUrl }
    ),
  };
};
