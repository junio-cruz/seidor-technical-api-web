import { databaseInstance } from '../../session';
import {
  CreateVehicleUsageRepositoryInput,
  CreateVehicleUsageRepositoryOutput,
  ICreateVehicleUsageRepository,
} from '../../../../domain/repositories/VehicleUsage/ICreateVehicleUsageRepository';
import { VehicleUsage } from '../../../../domain/entities/VehicleUsage';

export class CreateVehicleUsageRepository implements ICreateVehicleUsageRepository {
  public async execute(
    input: CreateVehicleUsageRepositoryInput,
  ): Promise<CreateVehicleUsageRepositoryOutput> {
    const databaseSession: VehicleUsage[] = databaseInstance.getSession();
    databaseSession.push(input);
    return databaseSession[databaseSession.length - 1];
  } 
}
