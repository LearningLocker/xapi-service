import { ContainerURL } from '@azure/storage-blob';

 export default interface Config {
  readonly containerUrl: ContainerURL;
  readonly subFolder: string;
}
