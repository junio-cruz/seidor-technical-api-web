import { Vehicle } from '../../../domain/entities/Vehicle';
import { Logger } from '../../../infra/logger/Logger';
import { IGetVehicleRepository } from '../../../domain/repositories/Vehicle/IGetVehicleRepository';
import { GetVehicleRepository } from '../../../infra/database/repositories/Vehicle/GetVehicleRepository';

export type GetVehicleUseCaseInput = {
  vehicle_id: string;
};
    
export type GetVehicleUseCaseOutput = Vehicle | null;

export interface IGetVehicleUseCase {
  execute(input: GetVehicleUseCaseInput): Promise<GetVehicleUseCaseOutput>;
}

export class GetVehicleUseCase implements IGetVehicleUseCase {
  constructor(
    private readonly logger: Logger,
    private getVehicleRepository: IGetVehicleRepository = new GetVehicleRepository(),
  ) {
    this.logger.getChild('GetVehicleUseCase');
  }

  public async execute(
    input: GetVehicleUseCaseInput,
  ): Promise<GetVehicleUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const vehicle = await this.getVehicleRepository.execute({
      vehicle_id: input.vehicle_id,
    });
    this.logger.debug('get vehicle repository response', vehicle);
    this.logger.debug('execute output', vehicle);
    return vehicle;
  }
}
