import GetClientSignature from './getClient/Signature';

export default interface Facade {
  readonly getClient: GetClientSignature;
}
