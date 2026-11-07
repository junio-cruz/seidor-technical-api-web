import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { CreateDriverController } from './CreateDriverController';
import { CreateDriverUseCase } from '../../../application/usecases/driver/CreateDriverUseCase';
import { FakeCreateDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeCreateDriverRepository';
import { Driver } from '../../../domain/entities/Driver';

let logger: FakeLogger;
let validator: FakeValidator;
let sut: CreateDriverController;
let useCase: CreateDriverUseCase;
let createdriverRepository: FakeCreateDriverRepository;

const data = {
  name: '',
};

const request: HttpRequest = {
  headers: {},
  context: {},
  params: {},
  body: { ...data },
  query: [],
  state: {},
}


describe('CreateDriverController', () => {
  beforeEach(() => {
    logger = new FakeLogger();
    validator = new FakeValidator();
    createdriverRepository = new FakeCreateDriverRepository();
    // @ts-ignore
    useCase = new CreateDriverUseCase(logger, createdriverRepository);
    // @ts-ignore
    sut = new CreateDriverController(logger, validator, useCase);
    jest.spyOn(useCase, 'execute').mockResolvedValue({} as Driver);
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
