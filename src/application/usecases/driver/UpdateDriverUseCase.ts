import { Logger } from '../../../infra/logger/Logger';
import { IUpdateDriverRepository } from '../../../domain/repositories/Driver/IUpdateDriverRepository';
import { UpdateDriverRepository } from '../../../infra/database/repositories/Driver/UpdateDriverRepository';
import { Driver } from '../../../domain/entities/Driver';

export type UpdateDriverUseCaseInput = {
  driver_id: string;
  to_update: {
    name?: string;
  };
};

export type UpdateDriverUseCaseOutput = Driver | null;

export interface IUpdateDriverUseCase {
  execute(input: UpdateDriverUseCaseInput): Promise<UpdateDriverUseCaseOutput>;
}

export class UpdateDriverUseCase implements IUpdateDriverUseCase {
  constructor(
    private readonly logger: Logger,
    private updateDriverRepository: IUpdateDriverRepository = new UpdateDriverRepository(),
  ) {
    this.logger.getChild('UpdateDriverUseCase');
  }

  async execute(
    input: UpdateDriverUseCaseInput,
  ): Promise<UpdateDriverUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = this.updateDriverRepository.execute(input);
    this.logger.debug('update driver repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
