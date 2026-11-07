import { VehicleUsage } from '../../entities/VehicleUsage';

export type CreateVehicleUsageRepositoryInput = Omit<VehicleUsage, 'useStartDate' | 'useEndDate'>;

export type CreateVehicleUsageRepositoryOutput = Omit<VehicleUsage, 'useStartDate' | 'useEndDate'>;
export interface ICreateVehicleUsageRepository {
  execute(
    input: CreateVehicleUsageRepositoryInput,
  ): Promise<CreateVehicleUsageRepositoryOutput>;
}
