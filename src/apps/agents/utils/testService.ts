import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import serviceFactory from '../serviceFactory';
import Service from '../serviceFactory/Service';
const serviceFacade: Service = serviceFactory();
export default serviceFacade;
