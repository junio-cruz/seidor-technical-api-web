import { VehicleUsage } from '../../entities/VehicleUsage';

export type UpdateVehicleUsageRepositoryInput = {
  vehicle_usage_id: string;
  to_update: {
    use_end_date?: Date;
  };
};

export type UpdateVehicleUsageRepositoryOutput = VehicleUsage | null;

export interface IUpdateVehicleUsageRepository {
  execute(
    input: UpdateVehicleUsageRepositoryInput,
  ): Promise<UpdateVehicleUsageRepositoryOutput>;
}
