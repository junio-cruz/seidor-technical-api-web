import { VehicleUsage } from '../../entities/VehicleUsage';

export type CreateVehicleUsageRepositoryInput = VehicleUsage;

export type CreateVehicleUsageRepositoryOutput = VehicleUsage;
export interface ICreateVehicleUsageRepository {
  execute(
    input: CreateVehicleUsageRepositoryInput,
  ): Promise<CreateVehicleUsageRepositoryOutput>;
}
