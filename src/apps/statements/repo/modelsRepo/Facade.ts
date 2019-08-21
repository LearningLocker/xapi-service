import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateStatementsSignature from './createStatements/Signature';
import GetDownRefIdSignature from './getDownRefId/Signature';
import GetFullActivitySignature from './getFullActivity/Signature';
import GetHashesSignature from './getHashes/Signature';
import GetStatementSignature from './getStatement/Signature';
import GetStatementsSignature from './getStatements/Signature';
import GetStatementsByIdsSignature from './getStatementsByIds/Signature';
import GetUpRefIdsSignature from './getUpRefIds/Signature';
import GetUpRefsByIdsSignature from './getUpRefsByIds/Signature';
import GetVoidersByIdsSignature from './getVoidersByIds/Signature';
import GetVoidersByObjectIdsSignature from './getVoidersByObjectIds/Signature';
import IncrementStoreCountSignature from './incrementStoreCount/Signature';
import SetQueriablesSignature from './setQueriables/Signature';
import UpdateFullActivitiesSignature from './updateFullActivities/Signature';
import VoidStatementsSignature from './voidStatements/Signature';

interface ModelsRepo extends CommonRepo {
  readonly createStatements: CreateStatementsSignature;
  readonly getFullActivity: GetFullActivitySignature;
  readonly getStatement: GetStatementSignature;
  readonly getStatements: GetStatementsSignature;
  readonly getHashes: GetHashesSignature;
  readonly getVoidersByObjectIds: GetVoidersByObjectIdsSignature;
  readonly getVoidersByIds: GetVoidersByIdsSignature;
  readonly voidStatements: VoidStatementsSignature;
  readonly getDownRefId: GetDownRefIdSignature;
  readonly getUpRefIds: GetUpRefIdsSignature;
  readonly setQueriables: SetQueriablesSignature;
  readonly getStatementsByIds: GetStatementsByIdsSignature;
  readonly getUpRefsByIds: GetUpRefsByIdsSignature;
  readonly updateFullActivities: UpdateFullActivitiesSignature;
  readonly incrementStoreCount: IncrementStoreCountSignature;
}

export default ModelsRepo;
