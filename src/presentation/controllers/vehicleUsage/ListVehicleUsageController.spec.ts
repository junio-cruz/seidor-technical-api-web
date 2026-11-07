import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { ListVehicleUsageController } from './ListVehicleUsageController';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { ListVehicleUsageUseCase } from '../../../application/usecases/vehicleUsage/ListVehicleUsageUseCase';
import { FakeListVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeListVehicleUsageRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let listVehicleUsageRepository: FakeListVehicleUsageRepository;
let useCase: ListVehicleUsageUseCase;
let sut: ListVehicleUsageController;


const data = {
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

describe('ListVehicleUsageController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        listVehicleUsageRepository = new FakeListVehicleUsageRepository();
        validator = new FakeValidator();
        useCase = new ListVehicleUsageUseCase(
            // @ts-ignore
            logger,
            listVehicleUsageRepository,
        );
        // @ts-ignore
        sut = new ListVehicleUsageController(logger, validator, useCase);
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
