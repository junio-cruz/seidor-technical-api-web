import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { Driver } from '../../../domain/entities/Driver';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { DeleteDriverController } from './DeleteDriverController';
import { DeleteDriverUseCase, DeleteDriverUseCaseInput } from '../../../application/usecases/driver/DeleteDriverUseCase';
import { FakeDeleteDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeDeleteDriverRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let deleteDriverRepository: FakeDeleteDriverRepository;
let useCase: DeleteDriverUseCase;
let sut: DeleteDriverController;


const data: DeleteDriverUseCaseInput = {
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

describe('DeleteDriverController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        deleteDriverRepository = new FakeDeleteDriverRepository();
        validator = new FakeValidator();
        useCase = new DeleteDriverUseCase(
            // @ts-ignore
            logger,
            deleteDriverRepository,
        );
        // @ts-ignore
        sut = new DeleteDriverController(logger, validator, useCase);
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
