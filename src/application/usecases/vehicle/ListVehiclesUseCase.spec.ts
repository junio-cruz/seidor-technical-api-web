import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { ListVehiclesUseCaseInput, ListVehiclesUseCase } from './ListVehiclesUseCase';
import { FakeListVehiclesRepository } from '../../../infra/database/repositories/fakes/vehicle/FakeListVehicleRepository';

let fakeListVehicleRepository: FakeListVehiclesRepository;
let sut: ListVehiclesUseCase;
let logger: FakeLogger;

const data: ListVehiclesUseCaseInput = {
    filter: {
        mark: 'Chevrolet',
        color: 'Prata',
    },
    pagination: {
        page: 1,
        page_size: 10,
    }
};

describe('ListVehiclesUseCase', () => {
    beforeEach(() => {
        fakeListVehicleRepository = new FakeListVehiclesRepository();
        logger = new FakeLogger();
        // @ts-ignore
        sut = new ListVehiclesUseCase(logger, fakeListVehicleRepository);
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

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new ListVehiclesUseCase(logger);

        expect(defaultSut).toBeDefined();
    });
});
