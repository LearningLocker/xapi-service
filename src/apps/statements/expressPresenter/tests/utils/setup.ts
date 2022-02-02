import setupService from 'jscommons/dist/tests/utils/setupService';
import { SuperTest, Test } from 'supertest';
import Service from '../../../serviceFactory/Service';
import service from '../../../utils/testService';
import supertest from './supertest';

const setup = setupService(service);

export interface Result {
  readonly service: Service;
  readonly supertest: SuperTest<Test>;
}

export default (): Result => {
  setup();
  return { service, supertest };
};
