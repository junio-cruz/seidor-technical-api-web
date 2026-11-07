import { databaseInstance } from '../../session';
import {
  IUpdateVehicleUsageRepository,
  UpdateVehicleUsageRepositoryInput,
  UpdateVehicleUsageRepositoryOutput,
} from '../../../../domain/repositories/VehicleUsage/IUpdateVehicleUsageRepository';
import { VehicleUsage } from '../../../../domain/entities/VehicleUsage';

export class UpdateVehicleUsageRepository implements IUpdateVehicleUsageRepository {
  public async execute(
    input: UpdateVehicleUsageRepositoryInput,
  ): Promise<UpdateVehicleUsageRepositoryOutput> {
    let response: any;
    const databaseSession = databaseInstance.getSession() as VehicleUsage[];
    const vehicle_usage_found = databaseSession.find((vehicle_usage) => vehicle_usage.vehicle_usage_id === input.vehicle_usage_id) as any || null;
    if (!vehicle_usage_found){
      return null;
    }
    const database_session_updated = databaseSession.map(vehicle_usage => {
        if (vehicle_usage.vehicle_usage_id === input.vehicle_usage_id) {
          response = {
            vehicle_usage_id: input.vehicle_usage_id,
            ...input.to_update,
          }
          return response
        }
      return  vehicle_usage;
    }) as VehicleUsage[];
    databaseInstance.updateSession(database_session_updated);
    return response;
  }
}
