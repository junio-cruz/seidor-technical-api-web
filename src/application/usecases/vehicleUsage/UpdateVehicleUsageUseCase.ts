import { Logger } from '../../../infra/logger/Logger';
import { UpdateVehicleUsageRepository } from '../../../infra/database/repositories/VehicleUsage/UpdateVehicleUsageRepository';
import { VehicleUsage } from '../../../domain/entities/VehicleUsage';
import { IUpdateVehicleUsageRepository } from '../../../domain/repositories/VehicleUsage/IUpdateVehicleUsageRepository';

export type UpdateVehicleUsageUseCaseInput = {
  vehicle_usage_id: string;
  to_update: {
    use_end_date?: Date;
  };  
};

export type UpdateVehicleUsageUseCaseOutput = VehicleUsage | null;

export interface IUpdateVehicleUsageUseCase {
  execute(input: UpdateVehicleUsageUseCaseInput): Promise<UpdateVehicleUsageUseCaseOutput>;
}

export class UpdateVehicleUsageUseCase implements IUpdateVehicleUsageUseCase {
  constructor(
    private readonly logger: Logger,
    private updateVehicleUsageRepository: IUpdateVehicleUsageRepository = new UpdateVehicleUsageRepository(),
  ) {
    this.logger.getChild('UpdateVehicleUsageUseCase');
  }

  async execute(
    input: UpdateVehicleUsageUseCaseInput,
  ): Promise<UpdateVehicleUsageUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = this.updateVehicleUsageRepository.execute(input);
    this.logger.debug('update vehicle usage repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
