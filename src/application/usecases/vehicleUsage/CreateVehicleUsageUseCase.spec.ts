import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { CreateVehicleUsageUseCaseInput, CreateVehicleUsageUseCase } from './CreateVehicleUsageUseCase';
import { FakeCreateVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeCreateVehicleUsageRepository';
import { FakeFindVehicleUsageByDriverRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeFindVehicleUsageByDriverRepository';

let fakeLogger: FakeLogger;
let fakeFindVehicleUsageByDriverRepository: FakeFindVehicleUsageByDriverRepository
let fakeCreateaVehicleUsageRepository: FakeCreateVehicleUsageRepository;
let sut: CreateVehicleUsageUseCase;

const data: CreateVehicleUsageUseCaseInput = {
       driver: {
        driver_id: uuidV4(),
        name: 'John Doe',
    },
    use_reason: 'Teste',
    vehicle: {
        vehicle_id: uuidV4(),
        color: 'prata',
        plate: 'ABC1234',
        mark: 'Chevrolet',
    }
};

describe('CreateaVehicleUsageUseCase', () => {
    beforeEach(() => {
        fakeCreateaVehicleUsageRepository = new FakeCreateVehicleUsageRepository();
        fakeFindVehicleUsageByDriverRepository = new FakeFindVehicleUsageByDriverRepository();
        fakeLogger = new FakeLogger();
        // @ts-ignore
        sut = new CreateaVehicleUsageUseCase(fakeLogger, fakeFindVehicleUsageByDriverRepository,fakeCreateaVehicleUsageRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

      it('should be able return erro if vehicle usage already exist for driver', async () => {
        const error = new Error('Vehicle usage already exist for driver');
        expect(await sut.execute(data)).toThrow(error);
    });

    it('should be able to create an VehicleUsage', async () => {
        const delete_user_id = await sut.execute(data);

        jest.spyOn(fakeFindVehicleUsageByDriverRepository, 'execute').mockResolvedValue(null);

        expect(delete_user_id).toHaveProperty('vehicle_usage_id');
    });
});
