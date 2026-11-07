import { databaseInstance } from '../../session';
import {
  DeleteVehicleRepositoryInput,
  DeleteVehicleRepositoryOutput,
  IDeleteVehicleRepository,
} from '../../../../domain/repositories/Vehicle/IDeleteVehicleRepository';
import { Vehicle } from '../../../../domain/entities/Vehicle';

export class DeleteVehicleRepository implements IDeleteVehicleRepository {
  public async execute(
    input: DeleteVehicleRepositoryInput  ,
  ): Promise<DeleteVehicleRepositoryOutput> {
    const databaseSession: Vehicle[] = databaseInstance.getSession();
    let result: DeleteVehicleRepositoryOutput = null;
    const vehicleIndex = databaseSession.findIndex((vehicle) => vehicle.vehicle_id === input.vehicle_id);
    if (vehicleIndex !== -1) {
      result = databaseSession[vehicleIndex];
      databaseSession.splice(vehicleIndex, 1);
    }
    return result;
  } 
}
