import { Logger } from '../../../infra/logger/Logger';
import { UpdateVehicleUsageRepository } from '../../../infra/database/repositories/VehicleUsage/UpdateVehicleUsageRepository';
import { VehicleUsage } from '../../../domain/entities/VehicleUsage';
import { IUpdateVehicleUsageRepository } from '../../../domain/repositories/VehicleUsage/IUpdateVehicleUsageRepository';

export type FinishVehicleUsageUseCaseInput = {
  vehicle_usage_id: string;
};

export type FinishVehicleUsageUseCaseOutput = VehicleUsage | null;

export interface IFinishVehicleUsageUseCase {
  execute(input: FinishVehicleUsageUseCaseInput): Promise<FinishVehicleUsageUseCaseOutput>;
}

export class FinishVehicleUsageUseCase implements IFinishVehicleUsageUseCase {
  constructor(
    private readonly logger: Logger,
    private updateVehicleUsageRepository: IUpdateVehicleUsageRepository = new UpdateVehicleUsageRepository(),
  ) {
    this.logger.getChild('FinishVehicleUsageUseCase');
  }

  async execute(
    input: FinishVehicleUsageUseCaseInput,
  ): Promise<FinishVehicleUsageUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = this.updateVehicleUsageRepository.execute({
      vehicle_usage_id: input.vehicle_usage_id,
      to_update: {
        use_end_date: new Date(),
      },
    });
    this.logger.debug('update vehicle usage repository response', response);
    this.logger.debug('execute output', response);
    return response;
  }
}
