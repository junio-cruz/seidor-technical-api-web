import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { GetVehicleUseCaseInput, GetVehicleUseCase } from './GetVehicleUseCase';
import { FakeGetVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeGetVehicleRepository';

let fakeLogger: FakeLogger;
let fakeGetVehicleRepository: FakeGetVehicleRepository;
let sut: GetVehicleUseCase;

const data: GetVehicleUseCaseInput = {
    vehicle_id: uuidV4(),
};

describe('GetVehicleUseCase', () => {
    beforeEach(() => {
        fakeGetVehicleRepository = new FakeGetVehicleRepository();
        fakeLogger = new FakeLogger();
        // @ts-ignore
        sut = new GetVehicleUseCase(fakeLogger, fakeGetVehicleRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to Get an vehicle', async () => {
        const Get_vehicle_id = await sut.execute(data);

        expect(Get_vehicle_id).toHaveProperty('vehicle_id');
    });
});
