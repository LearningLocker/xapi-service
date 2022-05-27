import { S3Client } from '@aws-sdk/client-s3';
import commonS3Repo from 'jscommons/dist/s3Repo';
import { defaultTo } from 'lodash';
import createAttachments from '../../createAttachments/s3';
import Facade from '../../Facade';
import getAttachment from '../../getAttachment/s3';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    client: new S3Client({
      tls: true,
      apiVersion: '2006-03-01',
      ...factoryConfig.awsConfig,
    }),
    bucketName: defaultTo(factoryConfig.bucketName, 'xapi-server'),
    subFolder: defaultTo(factoryConfig.subFolder, '/storage'),
  };
  return {
    ...commonS3Repo(facadeConfig),
    createAttachments: createAttachments(facadeConfig),
    getAttachment: getAttachment(facadeConfig),
  };
};
