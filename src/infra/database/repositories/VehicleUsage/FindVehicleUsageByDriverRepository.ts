import { databaseInstance } from '../../session';
import {
  FindVehicleUsageByDriverRepositoryInput,
  FindVehicleUsageByDriverRepositoryOutput,
  IFindVehicleUsageByDriverRepository,
} from '../../../../domain/repositories/VehicleUsage/IFindVehicleUsageByDriverRepository';
import { VehicleUsage } from '../../../../domain/entities/VehicleUsage';

export class FindVehicleUsageByDriverRepository implements IFindVehicleUsageByDriverRepository {
  public async execute(
    input: FindVehicleUsageByDriverRepositoryInput,
  ): Promise<FindVehicleUsageByDriverRepositoryOutput> {
    const databaseSession: VehicleUsage[] = databaseInstance.getSession();
    const vehicleUsage = databaseSession.find((vehicleUsage) => vehicleUsage.driver.name === input.driver_name);
    return vehicleUsage || null;
  } 
}
