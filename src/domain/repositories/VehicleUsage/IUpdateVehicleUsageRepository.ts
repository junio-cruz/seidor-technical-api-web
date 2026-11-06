import { VehicleUsage } from '../../entities/VehicleUsage';

export type UpdateVehicleUsageRepositoryInput = {
  driver_name: string;
  to_update: {
    use_start_date?: Date;
    use_end_date?: Date;
  };
};

export type UpdateVehicleUsageRepositoryOutput = VehicleUsage | null;

export interface IUpdateVehicleUsageRepository {
  execute(
    input: UpdateVehicleUsageRepositoryInput,
  ): Promise<UpdateVehicleUsageRepositoryOutput>;
}
