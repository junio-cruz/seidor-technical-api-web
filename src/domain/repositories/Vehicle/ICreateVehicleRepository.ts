import { Vehicle } from '../../entities/Vehicle';

export type CreateVehicleRepositoryInput = {
  vehicle_id: string;
  plate: string;
  color: string;
  mark: string;
  };

export type CreateVehicleRepositoryOutput = Vehicle;
export interface ICreateVehicleRepository {
  execute(
    input: CreateVehicleRepositoryInput,
  ): Promise<CreateVehicleRepositoryOutput>;
}
