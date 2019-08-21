import createSha from './createSha';

export default (content: string, fileUrl?: string, contentType = 'text/plain'): any => {
  return {
    usageType: 'http://www.example.com',
    display: {},
    contentType,
    length: 0,
    sha2: createSha(content),
    ...(
      fileUrl === undefined ? {} :
        { fileUrl }
    ),
  };
};
