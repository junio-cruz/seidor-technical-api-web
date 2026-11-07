import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { DeleteVehicleUseCaseInput, DeleteVehicleUseCase } from './DeleteVehicleUseCase';
import { FakeDeleteVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeDeleteVehicleRepository';

let fakeLogger: FakeLogger;
let fakeDeleteVehicleRepository: FakeDeleteVehicleRepository;
let sut: DeleteVehicleUseCase;

const data: DeleteVehicleUseCaseInput = {
    vehicle_id: uuidV4(),
};

describe('DeleteVehicleUseCase', () => {
    beforeEach(() => {
        fakeDeleteVehicleRepository = new FakeDeleteVehicleRepository();
        fakeLogger = new FakeLogger();
        // @ts-ignore
        sut = new DeleteVehicleUseCase(fakeLogger, fakeDeleteVehicleRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to delete an vehicle', async () => {
        const delete_vehicle_id = await sut.execute(data);

        expect(delete_vehicle_id).toHaveProperty('vehicle_id');
    });
});
