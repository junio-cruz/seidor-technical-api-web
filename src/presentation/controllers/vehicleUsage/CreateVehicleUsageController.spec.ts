import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { CreateVehicleUsageController } from './CreateVehicleUsageController';
import { CreateVehicleUsageUseCase } from '../../../application/usecases/vehicleUsage/CreateVehicleUsageUseCase';
import { FakeCreateVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeCreateVehicleUsageRepository';
import { VehicleUsage } from '../../../domain/entities/VehicleUsage';

let logger: FakeLogger;
let validator: FakeValidator;
let sut: CreateVehicleUsageController;
let useCase: CreateVehicleUsageUseCase;
let createVehicleUsageRepository: FakeCreateVehicleUsageRepository;

const data = {
  driver: {
    driver_id: '123',
    name: 'John Doe',
  },
  vehicle: {
    vehicle_id: '456',
    plate: 'ABC1234',
    mark: 'Test Mark',
    color: 'Test Color',
  },
  use_reason: 'Test reason',
};

const request: HttpRequest = {
  headers: {},
  context: {},
  params: {},
  body: { ...data },
  query: [],
  state: {},
}


describe('CreateVehicleUsageController', () => {
  beforeEach(() => {
    logger = new FakeLogger();
    validator = new FakeValidator();
    createVehicleUsageRepository = new FakeCreateVehicleUsageRepository();
    // @ts-ignore
    useCase = new CreateVehicleUsageUseCase(logger, createVehicleUsageRepository);
    // @ts-ignore
    sut = new CreateVehicleUsageController(logger, validator, useCase);
    jest.spyOn(useCase, 'execute').mockResolvedValue({} as VehicleUsage);
  });

  it('should call Logger.getChild', async () => {
    expect(logger.getChild('')).toBeInstanceOf(FakeLogger);
  });

  it('should be able Validator', async () => {
    const spyValidator = jest.spyOn(validator, 'validate');

    await sut.handle(request);

    expect(spyValidator).toHaveBeenCalled();
  });

  it('should be able UseCase', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');

    await sut.handle(request);

    expect(spyUseCase).toHaveBeenCalled();
  });

  it('should be able return httpResponse', async () => {

    const result = await sut.handle(request);

    expect(result).toBeInstanceOf(HttpResponse);
  });

  it('should be able return httpError', async () => {
    jest.spyOn(validator, 'validate').mockResolvedValue({
      isValid: false,
      errors: ['not_validated'],
    });

    const result = await sut.handle(request);

    expect(result).toBeInstanceOf(HttpError);
  });
});
