import Facade from '../../Facade';

export default (): Facade => {
  return {
    emitNewStatements: async () => {
      // Do nothing.
    },
    clearRepo: async () => {
      // Do nothing.
    },
    migrate: async () => {
      // Do nothing.
    },
    rollback: async () => {
      // Do nothing.
    },
  };
};
