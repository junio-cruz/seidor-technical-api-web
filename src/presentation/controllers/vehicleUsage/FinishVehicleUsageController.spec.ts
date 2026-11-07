import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { FinishVehicleUsageController } from './FinishVehicleUsageController';
import { FinishVehicleUsageUseCase, FinishVehicleUsageUseCaseInput } from '../../../application/usecases/vehicleUsage/FinishVehicleUsageUseCase';
import { FakeUpdateVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeUpdateVehicleUsageRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let updateVehicleUsageRepository: FakeUpdateVehicleUsageRepository;
let useCase: FinishVehicleUsageUseCase;
let sut: FinishVehicleUsageController;


const data: FinishVehicleUsageUseCaseInput = {
    vehicle_usage_id: '',
};

const request: HttpRequest = {
    headers: {},
    context: {},
    params: {},
    body: { ...data },
    query: [],
    state: {},
}

describe('FinishVehicleUsageController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        updateVehicleUsageRepository = new FakeUpdateVehicleUsageRepository();
        validator = new FakeValidator();
        useCase = new FinishVehicleUsageUseCase(
            // @ts-ignore
            logger,
            updateVehicleUsageRepository,
        );
        // @ts-ignore
        sut = new FinishVehicleUsageController(logger, validator, useCase);
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
        jest.spyOn(useCase, 'execute').mockResolvedValue({} as any);

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
        const defaultSut = new FinishVehicleUsageController(logger);

        expect(defaultSut).toBeDefined();
    });

});
