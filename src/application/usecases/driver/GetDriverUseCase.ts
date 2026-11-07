import { Driver } from '../../../domain/entities/Driver';
import { Logger } from '../../../infra/logger/Logger';
import { IGetDriverRepository } from '../../../domain/repositories/Driver/IGetDriverRepository';
import { GetDriverRepository } from '../../../infra/database/repositories/Driver/GetDriverRepository';

export type GetDriverUseCaseInput = {
  driver_id: string;
};
    
export type GetDriverUseCaseOutput = Driver | null;

export interface IGetDriverUseCase {
  execute(input: GetDriverUseCaseInput): Promise<GetDriverUseCaseOutput>;
}

export class GetDriverUseCase implements IGetDriverUseCase {
  constructor(
    private readonly logger: Logger,
    private getDriverRepository: IGetDriverRepository = new GetDriverRepository(),
  ) {
    this.logger.getChild('GetDriverUseCase');
  }

  public async execute(
    input: GetDriverUseCaseInput,
  ): Promise<GetDriverUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const driver = await this.getDriverRepository.execute({
      driver_id: input.driver_id,
    });
    this.logger.debug('get driver repository response', driver);
    this.logger.debug('execute output', driver);
    return driver;
  }
}
