import ClientModel from '../../../../models/ClientModel';
import Statement from '../../../../models/Statement';
import FacadeConfig from './FacadeConfig';
import matchesClientOption from './matchesClientOption';

export interface Options<Result> {
  readonly config: FacadeConfig;
  readonly query: (model: Statement) => boolean;
  readonly project: (model: Statement) => Result;
  readonly client: ClientModel;
}

export default async <Result>({ config, query, project, client }: Options<Result>) => {
  const results = config.state.statements.filter((model) => {
    return (
      query(model.statement) &&
      matchesClientOption(model, client)
    );
  }).map((model) => {
    return project(model.statement);
  });
  return results;
};
