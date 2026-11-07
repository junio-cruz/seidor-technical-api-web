import { VehicleUsage } from '../../entities/VehicleUsage';

export type FindVehicleUsageByDriverRepositoryInput = {
  driver_name: string;
};

export type FindVehicleUsageByDriverRepositoryOutput = VehicleUsage | null;
export interface IFindVehicleUsageByDriverRepository {
  execute(
    input: FindVehicleUsageByDriverRepositoryInput,
  ): Promise<FindVehicleUsageByDriverRepositoryOutput>;
}
