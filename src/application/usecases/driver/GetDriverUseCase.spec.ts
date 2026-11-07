import { v4 as uuidV4 } from 'uuid';

import { FakeLogger } from '../../infra/logger/FakeLogger';
import { GetUserUseCaseInput, GetUserUseCase } from './GetUserUseCase';
import { FakeGetUserRepository } from '../../infra/database/repositories/fakes/FakeGetUserRepository';
import { FakeUpdateUserRepository } from '../../infra/database/repositories/fakes/FakeUpdateUserRepository';

let logger : FakeLogger;
let fakeGetUserRepository: FakeUpdateUserRepository;
let sut: GetUserUseCase;

const data: GetUserUseCaseInput = {
    user_id: uuidV4(),
};

describe('GetUserUseCase', () => {
    beforeEach(() => {
        logger = new FakeLogger();
        fakeGetUserRepository = new FakeGetUserRepository();
        // @ts-ignore
        sut = new GetUserUseCase(logger, fakeGetUserRepository);
    });

    it('should call Logger.getChild', async () => {
        expect(logger.getChild('')).toBeInstanceOf(FakeLogger);
    });

    it('should calls GetUserRepository.execute with correct parameters', async () => {
        const spyFakeGetUserRepository = jest.spyOn(fakeGetUserRepository, 'execute');

        await sut.execute(data);

        expect(spyFakeGetUserRepository).toHaveBeenCalledWith({ user_id: data.user_id });
    });

    it('should calls GetUserRepository.execute return null if user not found', async () => {
        jest.spyOn(fakeGetUserRepository, 'execute').mockResolvedValue(null);
        expect(await sut.execute(data)).toBeNull();
    });

    it('should calls Logger.debug at least three times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(3);
    });

    it('should be able to return an user', async () => {
        const user = await sut.execute(data);

        expect(user).toHaveProperty('user_id');
    });
});
