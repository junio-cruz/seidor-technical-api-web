import { HttpError } from '../../http/errors';
import { HttpRequest } from '../../http/request';
import { HttpResponse } from '../../http/response';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { FakeValidator } from '../../../infra/validators/FakeValidator';
import { DeleteVehicleController } from './DeleteVehicleController';
import { DeleteVehicleUseCase, DeleteVehicleUseCaseInput } from '../../../application/usecases/vehicle/DeleteVehicleUseCase';
import { FakeDeleteVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeDeleteVehicleRepository';

let logger: FakeLogger;
let validator: FakeValidator;
let deleteVehicleRepository: FakeDeleteVehicleRepository;
let useCase: DeleteVehicleUseCase;
let sut: DeleteVehicleController;


const data: DeleteVehicleUseCaseInput = {
    vehicle_id: '',
};

const request: HttpRequest = {
    headers: {},
    context: {},
    params: {},
    body: { ...data },
    query: [],
    state: {},
}

describe('DeleteVehicleController', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        deleteVehicleRepository = new FakeDeleteVehicleRepository();
        validator = new FakeValidator();
        useCase = new DeleteVehicleUseCase(
            // @ts-ignore
            logger,
            deleteVehicleRepository,
        );
        // @ts-ignore
        sut = new DeleteVehicleController(logger, validator, useCase);
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
