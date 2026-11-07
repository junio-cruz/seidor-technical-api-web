import { Logger } from '../../../infra/logger/Logger';
import { IUpdateVehicleRepository } from '../../../domain/repositories/Vehicle/IUpdateVehicleRepository';
import { UpdateVehicleRepository } from '../../../infra/database/repositories/Vehicle/UpdateVehicleRepository';
import { Vehicle } from '../../../domain/entities/Vehicle';

export type UpdateVehicleUseCaseInput = {
  vehicle_id: string;
  to_update: {
    plate?: string;
    color?: string;
    mark?: string;
  };
};

export type UpdateVehicleUseCaseOutput = Vehicle | null;

export interface IUpdateVehicleUseCase {
  execute(input: UpdateVehicleUseCaseInput): Promise<UpdateVehicleUseCaseOutput>;
}

export class UpdateVehicleUseCase implements IUpdateVehicleUseCase {
  constructor(
    private readonly logger: Logger,
    private updateVehicleRepository: IUpdateVehicleRepository = new UpdateVehicleRepository(),
  ) {
    this.logger.getChild('UpdateVehicleUseCase');
  }

  async execute(
    input: UpdateVehicleUseCaseInput,
  ): Promise<UpdateVehicleUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = this.updateVehicleRepository.execute(input);
    this.logger.debug('update vehicle repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
