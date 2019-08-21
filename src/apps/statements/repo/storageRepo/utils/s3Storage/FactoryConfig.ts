import S3 from 'aws-sdk/clients/s3';

export default interface S3FactoryConfig {
  readonly bucketName?: string;
  readonly subFolder?: string;
  readonly awsConfig?: Partial<S3.ClientConfiguration>;
}
