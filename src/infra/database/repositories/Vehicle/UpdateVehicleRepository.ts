import { databaseInstance } from '../../session';
import {
  IUpdateVehicleRepository,
  UpdateVehicleRepositoryInput,
  UpdateVehicleRepositoryOutput,
} from '../../../../domain/repositories/Vehicle/IUpdateVehicleRepository';
import { Vehicle } from '../../../../domain/entities/Vehicle';

export class UpdateVehicleRepository implements IUpdateVehicleRepository {
  public async execute(
    input: UpdateVehicleRepositoryInput,
  ): Promise<UpdateVehicleRepositoryOutput> {
    let response: any;
    const databaseSession = databaseInstance.getSession() as Vehicle[];
    const vehicle_found = databaseSession.find((vehicle) => vehicle.vehicle_id === input.vehicle_id) as any || null;
    if (!vehicle_found){
      return null;
    }
    const database_session_updated = databaseSession.map(vehicle => {
        if (vehicle.vehicle_id === input.vehicle_id) {
          response = {
            vehicle_id: input.vehicle_id,
            ...input.to_update,
          }
          return response
        }
      return  vehicle;
    }) as Vehicle[];
    databaseInstance.updateSession(database_session_updated);
    return response;
  }
}
