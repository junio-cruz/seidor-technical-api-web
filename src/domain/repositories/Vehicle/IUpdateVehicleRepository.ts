import { Vehicle } from '../../entities/Vehicle';

export type UpdateVehicleRepositoryInput = {
  vehicle_id: string;
  to_update: {
    plate?: string;
    color?: string;
    mark?: string;
  };
};

export type UpdateVehicleRepositoryOutput = Vehicle | null;

export interface IUpdateVehicleRepository {
  execute(
    input: UpdateVehicleRepositoryInput,
  ): Promise<UpdateVehicleRepositoryOutput>;
}
