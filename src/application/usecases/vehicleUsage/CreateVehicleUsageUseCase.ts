import { VehicleUsage } from '../../../domain/entities/VehicleUsage';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { Logger } from '../../../infra/logger/Logger';
import { ICreateVehicleUsageRepository } from '../../../domain/repositories/VehicleUsage/ICreateVehicleUsageRepository';
import { CreateVehicleUsageRepository } from '../../../infra/database/repositories/VehicleUsage/CreateVehicleUsageRepository';
import { IGuidGenerator } from '../../../application/protocols/guid/IGuidGenerator';
import { UUIDGuidGenerator } from '../../../infra/guidGenerator/UUIDGuidGenerator';
import { Driver } from '../../../domain/entities/Driver';
import { IFindVehicleUsageByDriverRepository } from '../../../domain/repositories/VehicleUsage/IFindVehicleUsageByDriverRepository';
import { FindVehicleUsageByDriverRepository } from '../../../infra/database/repositories/VehicleUsage/FindVehicleUsageByDriverRepository';

export type CreateVehicleUsageUseCaseInput = {
    driver: Driver;
    use_reason: string;
    vehicle: Vehicle;
};
    
export type CreateVehicleUsageUseCaseOutput = VehicleUsage;

export interface ICreateVehicleUsageUseCase {
  execute(input: CreateVehicleUsageUseCaseInput): Promise<CreateVehicleUsageUseCaseOutput>;
}

export class CreateVehicleUsageUseCase implements ICreateVehicleUsageUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly guidGenerator: IGuidGenerator = new UUIDGuidGenerator(),
    private findVehicleUsageByDriverRepository: IFindVehicleUsageByDriverRepository = new FindVehicleUsageByDriverRepository(),
    private createVehicleUsageRepository: ICreateVehicleUsageRepository = new CreateVehicleUsageRepository(),
  ) {
    this.logger.getChild('CreateVehicleUsageUseCase');
  }

  public async execute(
    input: CreateVehicleUsageUseCaseInput,
  ): Promise<CreateVehicleUsageUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));

    const vehicleUsageFound = await this.findVehicleUsageByDriverRepository.execute({driver_name: input.driver.name});

    if (vehicleUsageFound) {
      throw new Error('Vehicle usage already exists');
    }

    const vehicleUsage = await this.createVehicleUsageRepository.execute({
      vehicle_usage_id: this.guidGenerator.uuidV4(),
      driver: input.driver,
      use_reason: input.use_reason,
      use_start_date: new Date(),
      use_end_date: null,
      vehicle: input.vehicle,
    });
    this.logger.debug('creaete vehicleUsage repository response', vehicleUsage);
    this.logger.debug('execute output', vehicleUsage);
    return vehicleUsage;
  }
}
