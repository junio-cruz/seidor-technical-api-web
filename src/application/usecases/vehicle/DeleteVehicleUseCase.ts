import { Vehicle } from '../../../domain/entities/Vehicle';
import { Logger } from '../../../infra/logger/Logger';
import { IDeleteVehicleRepository } from '../../../domain/repositories/Vehicle/IDeleteVehicleRepository';
import { DeleteVehicleRepository } from '../../../infra/database/repositories/Vehicle/DeleteVehicleRepository';

export type DeleteVehicleUseCaseInput = {
  vehicle_id: string;
};
    
export type DeleteVehicleUseCaseOutput = Vehicle | null;

export interface IDeleteVehicleUseCase {
  execute(input: DeleteVehicleUseCaseInput): Promise<DeleteVehicleUseCaseOutput>;
}

export class DeleteVehicleUseCase implements IDeleteVehicleUseCase {
  constructor(
    private readonly logger: Logger,
    private deleteVehicleRepository: IDeleteVehicleRepository = new DeleteVehicleRepository(),
  ) {
    this.logger.getChild('DeleteVehicleUseCase');
  }

  public async execute(
    input: DeleteVehicleUseCaseInput,
  ): Promise<DeleteVehicleUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const vehicle = await this.deleteVehicleRepository.execute({
      vehicle_id: input.vehicle_id,
    });
    this.logger.debug('delete vehicle repository response', vehicle);
    this.logger.debug('execute output', vehicle);
    return vehicle;
  }
}
