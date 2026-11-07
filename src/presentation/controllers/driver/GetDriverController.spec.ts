import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { Driver } from '../../../domain/entities/Driver';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { GetDriverController } from './GetDriverController';
import { GetDriverUseCase, GetDriverUseCaseInput } from '../../../application/usecases/driver/GetDriverUseCase';
import { FakeGetDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeGetDriverRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let GetDriverRepository: FakeGetDriverRepository;
let useCase: GetDriverUseCase;
let sut: GetDriverController;


const data: GetDriverUseCaseInput = {
    driver_id: '',
};

const request: HttpRequest = {
    headers: {},
    context: {},
    params: {},
    body: { ...data },
    query: [],
    state: {},
}

describe('GetDriverController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        GetDriverRepository = new FakeGetDriverRepository();
        validator = new FakeValidator();
        useCase = new GetDriverUseCase(
            // @ts-ignore
            logger,
            GetDriverRepository,
        );
        // @ts-ignore
        sut = new GetDriverController(logger, validator, useCase);
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

});
