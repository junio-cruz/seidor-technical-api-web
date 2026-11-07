import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { CreateVehicleUseCaseInput, CreateVehicleUseCase } from './CreateVehicleUseCase';
import { FakeCreateVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeCreateVehicleRepository';

let fakeLogger: FakeLogger;
let fakeCreateaVehicleRepository: FakeCreateVehicleRepository;
let sut: CreateVehicleUseCase;

const data: CreateVehicleUseCaseInput = {
    color: 'prata',
    plate: 'ABC1234',
    mark: 'Chevrolet',
};

describe('CreateaVehicleUseCase', () => {
    beforeEach(() => {
        fakeCreateaVehicleRepository = new FakeCreateVehicleRepository();
        fakeLogger = new FakeLogger();
        // @ts-ignore
        sut = new CreateaVehicleUseCase(fakeLogger, fakeCreateaVehicleRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to delete an user', async () => {
        const delete_user_id = await sut.execute(data);

        expect(delete_user_id).toHaveProperty('user_id');
    });
});
