import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { ListDriversController } from './ListDriverController';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { ListDriversUseCase } from '../../../application/usecases/driver/ListDriversUseCase';
import { FakeListDriversRepository } from '../../../infra/database/repositories/fakes/driver/FakeListDriversRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let listDriversRepository: FakeListDriversRepository;
let useCase: ListDriversUseCase;
let sut: ListDriversController;


const data = {
    name: 'Junio Cruz',
    page: 1,
    page_size: 10,
}

const request: HttpRequest = {
    headers: {},
    context: {},
    params: {},
    body: {},
    query: {...data},
    state: {},
}

describe('ListDriversController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        listDriversRepository = new FakeListDriversRepository();
        validator = new FakeValidator();
        useCase = new ListDriversUseCase(
            // @ts-ignore
            logger,
            listDriversRepository,
        );
        // @ts-ignore
        sut = new ListDriversController(logger, validator, useCase);
    });


    it('should call Logger.ListChilsd', async () => {
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
        jest.spyOn(useCase, 'execute').mockResolvedValue({
            page: 1,
            page_data: [],
            page_count: 10,
            all_count: 20,
            all_pages_count: 5
        });

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
