import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { CreateVehicleUseCaseInput, CreateVehicleUseCase } from './CreateVehicleUseCase';
import { FakeCreateVehicleRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeCreateVehicleRepository';
import { FakeGuidGenerator } from '../../../infra/guidGenerator/FakeGuidGenerator';

let fakeLogger: FakeLogger;
let fakeCreateaVehicleRepository: FakeCreateVehicleRepository;
let fakeGuidGenerator: FakeGuidGenerator;
let sut: CreateVehicleUseCase;

const data: CreateVehicleUseCaseInput = {
    color: 'prata',
    plate: 'ABC1234',
    mark: 'Chevrolet',
};

describe('CreateVehicleUseCase', () => {
    beforeEach(() => {
        fakeCreateaVehicleRepository = new FakeCreateVehicleRepository();
        fakeLogger = new FakeLogger();
        fakeGuidGenerator = new FakeGuidGenerator();

        // @ts-ignore
        sut = new CreateVehicleUseCase(fakeLogger, fakeGuidGenerator, fakeCreateaVehicleRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to create an vehicle', async () => {
        const vehicle = await sut.execute(data);

        expect(vehicle).toHaveProperty('vehicle_id');
    });
});
