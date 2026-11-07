import { FakeLogger } from '../../../infra/logger/FakeLogger';
import { UpdateDriverUseCase, UpdateDriverUseCaseInput } from './UpdateDriverUseCase';
import { FakeUpdateDriverRepository } from '../../../infra/database/repositories/fakes/driver/FakeUpdateDriverRepository';

let logger: FakeLogger;
let fakeUpdateDriverRepository: FakeUpdateDriverRepository;
let sut: UpdateDriverUseCase;

const data: UpdateDriverUseCaseInput = {
    driver_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
    to_update: {
        "name": "John Doe",
    }
};

describe('SignUpUseCase', () => {
    beforeEach(() => {
        fakeUpdateDriverRepository = new FakeUpdateDriverRepository();
        logger = new FakeLogger();
        // @ts-ignore
        sut = new UpdateDriverUseCase(logger, fakeUpdateDriverRepository);
    });

    it('should calls UpdateDriverRepository.execute with correct parameters', async () => {
        const spyFakeUpdateDriverRepository = jest.spyOn(fakeUpdateDriverRepository, 'execute');
        jest.spyOn(fakeUpdateDriverRepository, 'execute').mockResolvedValue(null);

        await sut.execute(data);

        expect(spyFakeUpdateDriverRepository).toHaveBeenCalledWith({
            driver_id: data.driver_id,
            to_update: data.to_update,
        });
    });

    it('should calls UpdateDriverRepository.execute return null if user not found', async () => {
        jest.spyOn(fakeUpdateDriverRepository, 'execute').mockResolvedValue(null);
        expect(await sut.execute(data)).toBeNull();
    });

    it('should calls Logger.debug at least three times', async () => {
        const spyFakeLogger = jest.spyOn(logger, 'debug');

        await sut.execute(data);

        expect(spyFakeLogger).toHaveBeenCalledTimes(3);
    });

    it('should be able to updated an driver', async () => {
        const response = await sut.execute(data);

        expect(response).toBeTruthy();
    });

    it('should instantiate with default dependencies', () => {
        // @ts-ignore
        const defaultSut = new UpdateDriverUseCase(logger);

        expect(defaultSut).toBeDefined();
    });
});
