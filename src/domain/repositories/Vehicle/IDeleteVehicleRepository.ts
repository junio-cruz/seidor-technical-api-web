import { Vehicle } from '../../entities/Vehicle';

export type DeleteVehicleRepositoryInput = {
  vehicle_id: string;
};

export type DeleteVehicleRepositoryOutput = Vehicle | null;

export interface IDeleteVehicleRepository {
  execute(input: DeleteVehicleRepositoryInput): Promise<DeleteVehicleRepositoryOutput>;
}
