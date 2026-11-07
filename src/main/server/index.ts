import { FastifyAdapter } from '../../infra/http/FastifyAdapter';

import { Logger } from '../../infra/logger/Logger';
import { logging } from '../../infra/logger/Manager';
import { AppConfig } from '../../infra/config/AppConfig';
import { CreateDriverController } from '../../presentation/controllers/driver/CreateDriverController';
import { GetDriverController } from '../../presentation/controllers/driver/GetDriverController';
import { ListDriversController } from '../../presentation/controllers/driver/ListDriverController';
import { UpdateDriverController } from '../../presentation/controllers/driver/UpdateDriverController';
import { DeleteDriverController } from '../../presentation/controllers/driver/DeleteDriverController';

import { ControllerErrorHandlerDecorator } from '../../presentation/decorators/ControllerErrorHandlerDecorator';
import { CreateVehicleController } from '../../presentation/controllers/vehicle/CreateVehicleController';
import { GetVehicleController } from '../../presentation/controllers/vehicle/GetVehicleController';
import { ListVehiclesController } from '../../presentation/controllers/vehicle/ListVehicleController';
import { UpdateVehicleController } from '../../presentation/controllers/vehicle/UpdateVehicleController';
import { DeleteVehicleController } from '../../presentation/controllers/vehicle/DeleteVehicleController';
import { CreateVehicleUsageController } from '../../presentation/controllers/vehicleUsage/CreateVehicleUsageController';
import { ListVehicleUsageController } from '../../presentation/controllers/vehicleUsage/ListVehicleUsageController';
import { FinishVehicleUsageController } from '../../presentation/controllers/vehicleUsage/FinishVehicleUsageController';

const server = new FastifyAdapter();

const appConfig = new AppConfig();
const logger: Logger = logging(appConfig.getValue('LOG_LEVEL')).getLogger(
  'ControllerFactory',
);

const createDriverController = new CreateDriverController(logger);
const getDriverController = new GetDriverController(logger);
const listDriversController = new ListDriversController(logger);
const updateDriverController = new UpdateDriverController(logger);
const deleteDriverController = new DeleteDriverController(logger);


const createVehicleController = new CreateVehicleController(logger);
const getVehicleController = new GetVehicleController(logger);
const listVehiclesController = new ListVehiclesController(logger);
const updateVehicleController = new UpdateVehicleController(logger);
const deleteVehicleController = new DeleteVehicleController(logger);

const createVehicleUsageController = new CreateVehicleUsageController(logger);
const finishVehicleUsageController = new FinishVehicleUsageController(logger);
const listVehicleUsageController = new ListVehicleUsageController(logger);

server.route(
  'post',
  '/driver',
  new ControllerErrorHandlerDecorator(logger, createDriverController),
);
server.route(
  'get',
  '/drivers/:driver_id',
  new ControllerErrorHandlerDecorator(logger, getDriverController),
);
server.route(
  'patch',
  '/drivers/:driver_id',
  new ControllerErrorHandlerDecorator(logger, updateDriverController),
);
server.route(
  'delete',
  '/drivers/:driver_id',
  new ControllerErrorHandlerDecorator(logger, deleteDriverController),
);

server.route(
    'get',
    '/drivers',
    new ControllerErrorHandlerDecorator(logger, listDriversController),
);

// Vehicle routes

server.route(
  'post',
  '/vehicle',
  new ControllerErrorHandlerDecorator(logger, createVehicleController),
);
server.route(
  'get',
  '/vehicles/:vehicle_id',
  new ControllerErrorHandlerDecorator(logger, getVehicleController),
);
server.route(
  'patch',
  '/vehicles/:vehicle_id',
  new ControllerErrorHandlerDecorator(logger, updateVehicleController),
);
server.route(
  'delete',
  '/vehicles/:vehicle_id',
  new ControllerErrorHandlerDecorator(logger, deleteVehicleController),
);

server.route(
    'get',
    '/vehicles',
    new ControllerErrorHandlerDecorator(logger, listVehiclesController),
);

// Vehicle Usage routes

server.route(
  'post',
  '/vehicleUsage',
  new ControllerErrorHandlerDecorator(logger, createVehicleUsageController),
);

server.route(
  'post',
  '/vehicleUsage/finish/:vehicle_id',
  new ControllerErrorHandlerDecorator(logger, finishVehicleUsageController),
);
server.route(
  'get',
  '/vehicleUsages',
  new ControllerErrorHandlerDecorator(logger, listVehicleUsageController),
);



export const app = server;
