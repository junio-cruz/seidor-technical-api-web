import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { GetDriverUseCaseInput, GetDriverUseCase } from './GetDriverUseCase';
import { FakeGetDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeGetDriverRepository';
import { FakeUpdateDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeUpdateDriverRepository';

let logger : FakeLogger;
let fakeGetDriverRepository: FakeUpdateDriverRepository;
let sut: GetDriverUseCase;

const data: GetDriverUseCaseInput = {
    driver_id: uuidV4(),
};

describe('GetDriverUseCase', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        fakeGetDriverRepository = new FakeGetDriverRepository();
        // @ts-ignore
        sut = new GetDriverUseCase(logger, fakeGetDriverRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(logger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should calls GetDriverRepository.execute with correct parameters', async () => {
        const spyFakeGetDriverRepository = jest.spyOn(fakeGetDriverRepository, 'execute');

        await sut.execute(data);

        expect(spyFakeGetDriverRepository).toHaveBeenCalledWith({ driver_id: data.driver_id });
    });

    it('should calls GetDriverRepository.execute return null if Driver not found', async () => {
        jest.spyOn(fakeGetDriverRepository, 'execute').mockResolvedValue(null);
        expect(await sut.execute(data)).toBeNull();
    });

    it('should calls Logger.debug at least three times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(3);
    });

    it('should be able to return an driver', async () => {
        const driver = await sut.execute(data);

        expect(driver).toHaveProperty('driver_id');
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new GetDriverUseCase(logger);

        expect(defaultSut).toBeDefined();
    });
});
