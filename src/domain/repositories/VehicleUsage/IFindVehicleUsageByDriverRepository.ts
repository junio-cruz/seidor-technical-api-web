import { VehicleUsage } from '../../entities/VehicleUsage';

export type FindVehicleUsageByDriverRepositoryInput = {
  driver_name: string;
};

export type FindVehicleUsageByDriverRepositoryOutput = Omit<VehicleUsage, 'useStartDate' | 'useEndDate'> | null;
export interface IFindVehicleUsageByDriverRepository {
  execute(
    input: FindVehicleUsageByDriverRepositoryInput,
  ): Promise<FindVehicleUsageByDriverRepositoryOutput>;
}
