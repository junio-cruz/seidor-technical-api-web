import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { Driver } from '../../../domain/entities/Driver';
import { UpdateDriverController } from './UpdateDriverController';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { UpdateDriverUseCase, UpdateDriverUseCaseInput } from '../../../application/usecases/driver/UpdateDriverUseCase';
import { FakeUpdateDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeUpdateDriverRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let updateDriverRepository: FakeUpdateDriverRepository;
let useCase: UpdateDriverUseCase;
let sut: UpdateDriverController;


const data: UpdateDriverUseCaseInput = {
    driver_id: '',
    to_update: {
        name: 'Junio Cruz Updated'
    }
};

const request: HttpRequest = {
    headers: {},
    context: {},
    params: {},
    body: { ...data },
    query: [],
    state: {},
}

describe('UpdateDriverController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        updateDriverRepository = new FakeUpdateDriverRepository();
        validator = new FakeValidator();
        useCase = new UpdateDriverUseCase(
            // @ts-ignore
            logger,
            updateDriverRepository,
        );
        // @ts-ignore
        sut = new UpdateDriverController(logger, validator, useCase);
    });


    it('should call Logger.UpdateChild', async () => {
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
        jest.spyOn(useCase, 'execute').mockResolvedValue({} as Driver);

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

    it('should be able return HttpNotFoundError', async () => {
        jest.spyOn(useCase, 'execute').mockResolvedValue(null);

        const result = await sut.handle(request);

        expect(result).toBeInstanceOf(HttpError);
        expect((result as HttpError).statusCode).toBe(404);
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new UpdateDriverController(logger);

        expect(defaultSut).toBeDefined();
    });
});
