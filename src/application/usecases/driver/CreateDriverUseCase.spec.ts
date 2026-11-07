import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { CreateDriverUseCaseInput, CreateDriverUseCase } from './CreateDriverUseCase';
import { FakeCreateDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeCreateDriverRepository';
import { FakeGuidGenerator } from '../../../infra/guidGenerator/FakeGuidGenerator';

let fakeLogger: FakeLogger;
let fakeCreateDriverRepository: FakeCreateDriverRepository;
let fakeGuidGenerator: FakeGuidGenerator;
let sut: CreateDriverUseCase;

const data: CreateDriverUseCaseInput = {
    name: 'Junio Cruz',
};

describe('CreateDriverUseCase', () => {
    beforeEach(() => {
        fakeCreateDriverRepository = new FakeCreateDriverRepository();
        fakeLogger = new FakeLogger();
        fakeGuidGenerator = new FakeGuidGenerator();

        // @ts-ignore
        sut = new CreateDriverUseCase(fakeLogger, fakeGuidGenerator, fakeCreateDriverRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(data);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to create an Driver', async () => {
        const driver = await sut.execute(data);

        expect(driver).toHaveProperty('driver_id');
    });
});
