import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { CreateVehicleUsageUseCaseInput, CreateVehicleUsageUseCase } from './CreateVehicleUsageUseCase';
import { FakeCreateVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeCreateVehicleUsageRepository';
import { FakeFindVehicleUsageByDriverRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeFindVehicleUsageByDriverRepository';
import { FakeGuidGenerator } from '../../../infra/guidGenerator/FakeGuidGenerator';

let fakeLogger: FakeLogger;
let fakeFindVehicleUsageByDriverRepository: FakeFindVehicleUsageByDriverRepository
let fakeCreateaVehicleUsageRepository: FakeCreateVehicleUsageRepository;
let fakeGuidGenerator: FakeGuidGenerator;
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

describe('CreateVehicleUsageUseCase', () => {
    beforeEach(() => {
        fakeCreateaVehicleUsageRepository = new FakeCreateVehicleUsageRepository();
        fakeFindVehicleUsageByDriverRepository = new FakeFindVehicleUsageByDriverRepository();
        fakeLogger = new FakeLogger();
        fakeGuidGenerator = new FakeGuidGenerator();
        jest.spyOn(fakeFindVehicleUsageByDriverRepository, 'execute').mockResolvedValue(null);

        // @ts-ignore
        sut = new CreateVehicleUsageUseCase(fakeLogger, fakeGuidGenerator, fakeFindVehicleUsageByDriverRepository,fakeCreateaVehicleUsageRepository);
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
        jest.spyOn(fakeFindVehicleUsageByDriverRepository, 'execute').mockResolvedValue({} as any);

        await expect(sut.execute(data)).rejects.toThrow('Vehicle usage already exists');
    });

    it('should be able to create an VehicleUsage', async () => {
        const vehicleUsage = await sut.execute(data);

        expect(vehicleUsage).toHaveProperty('vehicle_usage_id');
    });
});
