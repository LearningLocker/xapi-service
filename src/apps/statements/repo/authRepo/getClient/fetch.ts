import NoModel from 'jscommons/dist/errors/NoModel';
import fetch from 'node-fetch';
import Actor from '../../../models/Actor';
import ClientModel from '../../../models/ClientModel';
import FacadeConfig from '../utils/fetchAuth/FacadeConfig';
import Signature from './Signature';

const OK_HTTP_CODE = 200;
const NO_MODEL_HTTP_CODE = 404;

export default (config: FacadeConfig): Signature => {
  return async ({ authToken }) => {
    const json = await fetch(config.llClientInfoEndpoint, {
      headers: {
        Authorization: authToken,
      },
    }).then((res) => {
      if (res.status === NO_MODEL_HTTP_CODE) {
        throw new NoModel('ClientModel');
      }
      if (res.status !== OK_HTTP_CODE) {
        throw new Error(`Getting client failed with error code ${res.status}`);
      }
      return res.json();
    });

    const client: ClientModel = {
      _id: json._id as string,
      title: json.title as string,
      authority: json.authority as Actor,
      isTrusted: json.isTrusted as boolean,
      lrs_id: json.lrs_id as string,
      organisation: json.organisation as string,
      scopes: json.scopes as string[],
    };
    return { client };
  };
};
