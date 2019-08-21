import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import EmitNewStatementsSignature from './emitNewStatements/Signature';

export default interface Facade extends CommonRepo {
  readonly emitNewStatements: EmitNewStatementsSignature;
}
