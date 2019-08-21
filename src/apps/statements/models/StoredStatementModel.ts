import UnstoredStatementModel from './UnstoredStatementModel';

interface StoredStatementModel extends UnstoredStatementModel {
  _id: string;
}

export default StoredStatementModel;
