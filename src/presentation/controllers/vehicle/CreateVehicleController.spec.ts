import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { CreateVehicleController } from './CreateVehicleController';
import { CreateVehicleUseCase } from '../../../application/usecases/vehicle/CreateVehicleUseCase';
import { FakeCreateVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeCreateVehicleRepository';
import { Vehicle } from '../../../domain/entities/Vehicle';

let logger: FakeLogger;
let validator: FakeValidator;
let sut: CreateVehicleController;
let useCase: CreateVehicleUseCase;
let createVehicleRepository: FakeCreateVehicleRepository;

const data = {
  plate: 'ABC1234',
  mark: 'Chevrolet',
  color: 'Prata',
};

const request: HttpRequest = {
  headers: {},
  context: {},
  params: {},
  body: { ...data },
  query: [],
  state: {},
}


describe('CreateVehicleController', () => {
  beforeEach(() => {
    logger = new FakeLogger();
    validator = new FakeValidator();
    createVehicleRepository = new FakeCreateVehicleRepository();
    // @ts-ignore
    useCase = new CreateVehicleUseCase(logger, createVehicleRepository);
    // @ts-ignore
    sut = new CreateVehicleController(logger, validator, useCase);
    jest.spyOn(useCase, 'execute').mockResolvedValue({} as Vehicle);
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

  it('should instantiate with default dependencies', () => {
    // @ts-ignore
    const defaultSut = new CreateVehicleController(logger);

    expect(defaultSut).toBeDefined();
  });
});
