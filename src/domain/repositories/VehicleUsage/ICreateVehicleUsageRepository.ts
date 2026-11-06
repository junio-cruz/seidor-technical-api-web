import { VehicleUsage } from '../../entities/VehicleUsage';
import { Vehicle } from '../../entities/Vehicle';
import { Driver } from '../../entities/Driver';

export type CreateVehicleUsageRepositoryInput = {
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
  use_start_date: Date;
  use_end_date: Date;
};

export type CreateVehicleUsageRepositoryOutput = VehicleUsage;
export interface ICreateVehicleUsageRepository {
  execute(
    input: CreateVehicleUsageRepositoryInput,
  ): Promise<CreateVehicleUsageRepositoryOutput>;
}
