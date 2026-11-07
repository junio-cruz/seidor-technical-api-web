import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { ListVehiclesController } from './ListVehicleController';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { ListVehiclesUseCase } from '../../../application/usecases/vehicle/ListVehiclesUseCase';
import { FakeListVehiclesRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeListVehicleRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let listVehiclesRepository: FakeListVehiclesRepository;
let useCase: ListVehiclesUseCase;
let sut: ListVehiclesController;


const data = {
    plate: 'ABC1234',
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

describe('ListVehiclesController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        listVehiclesRepository = new FakeListVehiclesRepository();
        validator = new FakeValidator();
        useCase = new ListVehiclesUseCase(
            // @ts-ignore
            logger,
            listVehiclesRepository,
        );
        // @ts-ignore
        sut = new ListVehiclesController(logger, validator, useCase);
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

    it('should handle request without query params', async () => {
        const emptyRequest: HttpRequest = {
            headers: {},
            context: {},
            params: {},
            body: {},
            state: {},
        };
        const spyUseCase = jest.spyOn(useCase, 'execute').mockResolvedValue({
            page: 1,
            page_data: [],
            page_count: 0,
            all_count: 0,
            all_pages_count: 0,
        });

        const result = await sut.handle(emptyRequest);

        expect(result).toBeInstanceOf(HttpResponse);
        expect(spyUseCase).toHaveBeenCalledWith(
            expect.objectContaining({
                order: { created_at: 'asc' },
                pagination: { page: 1, page_size: 10 },
            }),
        );
    });

    it('should handle request with order params', async () => {
        const orderRequest: HttpRequest = {
            ...request,
            query: { orderField: 'plate', orderDirection: 'desc' },
        };
        const spyUseCase = jest.spyOn(useCase, 'execute').mockResolvedValue({
            page: 1,
            page_data: [],
            page_count: 0,
            all_count: 0,
            all_pages_count: 0,
        });

        await sut.handle(orderRequest);

        expect(spyUseCase).toHaveBeenCalledWith(
            expect.objectContaining({ order: { plate: 'desc' } }),
        );
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new ListVehiclesController(logger);

        expect(defaultSut).toBeDefined();
    });
});
