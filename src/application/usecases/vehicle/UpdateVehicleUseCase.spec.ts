import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { UpdateVehicleUseCase, UpdateVehicleUseCaseInput } from './UpdateVehicleUseCase';
import { FakeUpdateVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeUpdateVehicleRepository';

let logger: FakeLogger;
let fakeUpdateVehicleRepository: FakeUpdateVehicleRepository;
let sut: UpdateVehicleUseCase;

const data: UpdateVehicleUseCaseInput = {
    vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
    to_update: {
        "plate": "ABC1234",
        "color": "red",
        "mark": "toyota",
    }
};

describe('SignUpUseCase', () => {
    beforeEach(() => {
        fakeUpdateVehicleRepository = new FakeUpdateVehicleRepository();
        logger = new FakeLogger();
        // @ts-ignore
        sut = new UpdateVehicleUseCase(logger, fakeUpdateVehicleRepository);
    });

    it('should calls UpdateVehicleRepository.execute with correct parameters', async () => {
        const spyFakeUpdateVehicleRepository = jest.spyOn(fakeUpdateVehicleRepository, 'execute');
        jest.spyOn(fakeUpdateVehicleRepository, 'execute').mockResolvedValue(null);

        await sut.execute(data);

        expect(spyFakeUpdateVehicleRepository).toHaveBeenCalledWith({
            vehicle_id: data.vehicle_id,
            to_update: data.to_update,
        });
    });

    it('should calls UpdateVehicleRepository.execute return null if user not found', async () => {
        jest.spyOn(fakeUpdateVehicleRepository, 'execute').mockResolvedValue(null);
        expect(await sut.execute(data)).toBeNull();
    });

    it('should calls Logger.debug at least three times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(3);
    });

    it('should be able to updated an user', async () => {
        const response = await sut.execute(data);

        expect(response).toBeTruthy();
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new UpdateVehicleUseCase(logger);

        expect(defaultSut).toBeDefined();
    });
});
