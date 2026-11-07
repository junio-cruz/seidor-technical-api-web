import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { UpdateVehicleController } from './UpdateVehicleController';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { UpdateVehicleUseCase, UpdateVehicleUseCaseInput } from '../../../application/usecases/vehicle/UpdateVehicleUseCase';
import { FakeUpdateVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeUpdateVehicleRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let updateVehicleRepository: FakeUpdateVehicleRepository;
let useCase: UpdateVehicleUseCase;
let sut: UpdateVehicleController;


const data: UpdateVehicleUseCaseInput = {
    vehicle_id: '',
    to_update: {
        plate: 'ABC1234',
        color: 'Black',
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

describe('UpdateVehicleController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        updateVehicleRepository = new FakeUpdateVehicleRepository();
        validator = new FakeValidator();
        useCase = new UpdateVehicleUseCase(
            // @ts-ignore
            logger,
            updateVehicleRepository,
        );
        // @ts-ignore
        sut = new UpdateVehicleController(logger, validator, useCase);
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
        jest.spyOn(useCase, 'execute').mockResolvedValue({} as Vehicle);

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
