import {
  GetVehicleRepositoryInput,
  GetVehicleRepositoryOutput,
  IGetVehicleRepository,
} from '../../../../domain/repositories/Vehicle/IGetVehicleRepository';
import { databaseInstance } from '../../session';
import { Vehicle } from '../../../../domain/entities/Vehicle';

export class GetVehicleRepository implements IGetVehicleRepository {
  public async execute(
      input: GetVehicleRepositoryInput,
  ): Promise<GetVehicleRepositoryOutput> {        
    const databaseSession = databaseInstance.getSession();
    return databaseSession.find((vehicle: Vehicle) =>
      vehicle.vehicle_id === input.vehicle_id
    ) || null;
  }
}
