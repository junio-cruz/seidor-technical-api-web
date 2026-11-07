import { databaseInstance } from '../../session';
import {
  CreateVehicleRepositoryInput,
  CreateVehicleRepositoryOutput,
  ICreateVehicleRepository,
} from '../../../../domain/repositories/Vehicle/ICreateVehicleRepository';
import { Vehicle } from '../../../../domain/entities/Vehicle';

export class CreateVehicleRepository implements ICreateVehicleRepository {
  public async execute(
    input: CreateVehicleRepositoryInput,
  ): Promise<CreateVehicleRepositoryOutput> {
    const databaseSession: Vehicle[] = databaseInstance.getSession();
    databaseSession.push(input);
    return databaseSession.find((vehicle) => vehicle.vehicle_id === input.vehicle_id) as Vehicle;
  } 
}
