import { Driver } from '../../../domain/entities/Driver';
import { Logger } from '../../../infra/logger/Logger';
import { IDeleteDriverRepository } from '../../../domain/repositories/Driver/IDeleteDriverRepository';
import { DeleteDriverRepository } from '../../../infra/database/repositories/Driver/DeleteDriverRepository';

export type DeleteDriverUseCaseInput = {
  driver_id: string;
};
    
export type DeleteDriverUseCaseOutput = Driver | null;

export interface IDeleteDriverUseCase {
  execute(input: DeleteDriverUseCaseInput): Promise<DeleteDriverUseCaseOutput>;
}

export class DeleteDriverUseCase implements IDeleteDriverUseCase {
  constructor(
    private readonly logger: Logger,
    private deleteDriverRepository: IDeleteDriverRepository = new DeleteDriverRepository(),
  ) {
    this.logger.getChild('DeleteDriverUseCase');
  }

  public async execute(
    input: DeleteDriverUseCaseInput,
  ): Promise<DeleteDriverUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const driver = await this.deleteDriverRepository.execute({
      driver_id: input.driver_id,
    });
    this.logger.debug('delete driver repository response', driver);
    this.logger.debug('execute output', driver);
    return driver;
  }
}
