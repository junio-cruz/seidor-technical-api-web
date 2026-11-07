import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { ListVehicleUsageUseCaseInput, ListVehicleUsageUseCase } from './ListVehicleUsageUseCase';
import { FakeListVehicleUsageRepository } from '../../../infra/database/repositories/fakes/vehicleUsage/FakeListVehicleUsageRepository';

let fakeListVehicleRepository: FakeListVehicleUsageRepository;
let sut: ListVehicleUsageUseCase;
let logger: FakeLogger;

const data: ListVehicleUsageUseCaseInput = {
    filter: {
    },
    pagination: {
        page: 1,
        page_size: 10,
    }
};

describe('ListVehicleUsageUseCase', () => {
    beforeEach(() => {
        fakeListVehicleRepository = new FakeListVehicleUsageRepository();
        logger = new FakeLogger();
        // @ts-ignore
        sut = new ListVehicleUsageUseCase(logger, fakeListVehicleRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(logger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should calls ListVehicleRepository.execute with correct parameters', async () => {
        const spyFakeListVehicleRepository = jest.spyOn(fakeListVehicleRepository, 'execute');

        await sut.execute(data);

        expect(spyFakeListVehicleRepository).toHaveBeenCalledWith(data);
    });

    it('should calls Logger.debug at least two times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(2);
    });

    it('should be able to list an Vehicle', async () => {
        const listVehicle = await sut.execute(data);

        expect(listVehicle).toHaveProperty('page');
        expect(listVehicle).toHaveProperty('page_data');
        expect(listVehicle).toHaveProperty('page_count');
        expect(listVehicle).toHaveProperty('all_count');
        expect(listVehicle).toHaveProperty('all_pages_count');
    });
});
