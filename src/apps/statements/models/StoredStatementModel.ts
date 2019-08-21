import UnstoredStatementModel from './UnstoredStatementModel';

interface StoredStatementModel extends UnstoredStatementModel {
  readonly _id: string;
}

export default StoredStatementModel;
