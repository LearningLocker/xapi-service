import { S3ClientConfig } from '@aws-sdk/client-s3';

export default interface S3FactoryConfig {
  readonly bucketName?: string;
  readonly subFolder?: string;
  readonly awsConfig?: Partial<S3ClientConfig>;
}
