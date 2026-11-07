import { FakeUpdateVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeUpdateVehicleUsageRepository';
import { FakeLogger } from '../../../infra/logger/FakeLogger';  
import { FinishVehicleUsageUseCase, FinishVehicleUsageUseCaseInput } from './FinishVehicleUsageUseCase';

let logger: FakeLogger;
let fakeUpdateVehicleUsageRepository: FakeUpdateVehicleUsageRepository;
let sut: FinishVehicleUsageUseCase;

const data: FinishVehicleUsageUseCaseInput = {
    vehicle_usage_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
};

describe('SignUpUseCase', () => {
    beforeEach(() => {
        fakeUpdateVehicleUsageRepository = new FakeUpdateVehicleUsageRepository();
        logger = new FakeLogger();
        // @ts-ignore
        sut = new UpdateVehicleUsageUseCase(logger, fakeUpdateVehicleUsageRepository);
    });

    it('should calls UpdateVehicleUsageRepository.execute with correct parameters', async () => {
        const spyFakeUpdateVehicleUsageRepository = jest.spyOn(fakeUpdateVehicleUsageRepository, 'execute');
        jest.spyOn(fakeUpdateVehicleUsageRepository, 'execute').mockResolvedValue(null);

        await sut.execute(data);

        expect(spyFakeUpdateVehicleUsageRepository).toHaveBeenCalledWith({
            vehicle_usage_id: data.vehicle_usage_id,
            to_update: {
                use_end_date: new Date(),
            },
        });
    });

    it('should calls UpdateVehicleUsageRepository.execute return null if user not found', async () => {
        jest.spyOn(fakeUpdateVehicleUsageRepository, 'execute').mockResolvedValue(null);
        expect(await sut.execute(data)).toBeNull();
    });

    it('should calls Logger.debug at least three times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(3);
    });

    it('should be able to updated an VehicleUsage', async () => {
        const response = await sut.execute(data);

        expect(response).toBeTruthy();
    });
});
