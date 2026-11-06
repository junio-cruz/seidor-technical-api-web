import { Vehicle } from '../../entities/Vehicle';

export type GetVehicleRepositoryInput = {
  vehicle_id: string;
};

export type GetVehicleRepositoryOutput = Vehicle | null;

export interface IGetVehicleRepository {
  execute(input: GetVehicleRepositoryInput): Promise<GetVehicleRepositoryOutput>;
}
