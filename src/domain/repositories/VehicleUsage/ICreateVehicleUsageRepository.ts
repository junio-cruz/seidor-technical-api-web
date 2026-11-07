import { VehicleUsage } from '../../entities/VehicleUsage';
import { Vehicle } from '../../entities/Vehicle';
import { Driver } from '../../entities/Driver';

export type CreateVehicleUsageRepositoryInput = {
  vehicle_usage_id: string;
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
  use_start_date: Date;
};

export type CreateVehicleUsageRepositoryOutput = Omit<VehicleUsage, 'useStartDate' | 'useEndDate'>;
export interface ICreateVehicleUsageRepository {
  execute(
    input: CreateVehicleUsageRepositoryInput,
  ): Promise<CreateVehicleUsageRepositoryOutput>;
}
