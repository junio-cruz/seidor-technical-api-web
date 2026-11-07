import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { DeleteDriverUseCaseInput, DeleteDriverUseCase, IDeleteDriverUseCase } from './DeleteDriverUseCase';
import { FakeDeleteDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeDeleteDriverRepository';

let fakeLogger: FakeLogger;
let fakeDeleteDriverRepository: FakeDeleteDriverRepository;
let sut: IDeleteDriverUseCase;

const input: DeleteDriverUseCaseInput = {
    driver_id: uuidV4(),
};

describe('DeleteDriverUseCase', () => {
    beforeEach(() => {
        fakeDeleteDriverRepository = new FakeDeleteDriverRepository();
        fakeLogger = new FakeLogger();
        // @ts-ignore
        sut = new DeleteDriverUseCase(fakeLogger, fakeDeleteDriverRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(fakeLogger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should call Logger.debug at least three times', async () => {
        const spyFakeLoggerDebug = jest.spyOn(fakeLogger, 'debug');

        await sut.execute(input);

        expect(spyFakeLoggerDebug).toHaveBeenCalledTimes(3);
    });

    it('should be able to delete an driver', async () => {
        const response = await sut.execute(input);

        expect(response).toHaveProperty('driver_id');
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new DeleteDriverUseCase(fakeLogger);

        expect(defaultSut).toBeDefined();
    });
});
