import MaxEtags from '../../errors/MaxEtags';

export default (ifMatch?: string, ifNoneMatch?: string) => {
  if (ifMatch !== undefined && ifNoneMatch !== undefined) {
    throw new MaxEtags();
  }
};
