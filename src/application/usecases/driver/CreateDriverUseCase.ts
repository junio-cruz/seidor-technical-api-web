import { Driver } from '../../../domain/entities/Driver';
import { Logger } from '../../../infra/logger/Logger';
import { ICreateDriverRepository } from '../../../domain/repositories/Driver/ICreateDriverRepository';
import { CreateDriverRepository } from '../../../infra/database/repositories/Driver/CreateDriverRepository';
import { IGuidGenerator } from '../../protocols/guid/IGuidGenerator';
import { UUIDGuidGenerator } from '../../../infra/guidGenerator/UUIDGuidGenerator';

export type CreateDriverUseCaseInput = {
  name: string;
};
    
export type CreateDriverUseCaseOutput = Driver;

export interface ICreateDriverUseCase {
  execute(input: CreateDriverUseCaseInput): Promise<CreateDriverUseCaseOutput>;
}

export class CreateDriverUseCase implements ICreateDriverUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly generateUUId: IGuidGenerator = new UUIDGuidGenerator(),
    private createDriverRepository: ICreateDriverRepository = new CreateDriverRepository(),
  ) {
    this.logger.getChild('CreateDriverUseCase');
  }

  public async execute(
    input: CreateDriverUseCaseInput,
  ): Promise<CreateDriverUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const driver = await this.createDriverRepository.execute({
      driver_id: this.generateUUId.uuidV4(),
      name: input.name,
    });
    this.logger.debug('creaete user repository response', driver);
    this.logger.debug('execute output', driver);
    return driver;
  }

  
}
