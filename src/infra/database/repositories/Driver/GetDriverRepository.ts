import {
  GetDriverRepositoryInput,
  GetDriverRepositoryOutput,
  IGetDriverRepository,
} from '../../../../domain/repositories/Driver/IGetDriverRepository';
import { databaseInstance } from '../../session';
import { Driver } from '../../../../domain/entities/Driver';

export class GetDriverRepository implements IGetDriverRepository {
  public async execute(
      input: GetDriverRepositoryInput,
  ): Promise<GetDriverRepositoryOutput> {        
    const databaseSession = databaseInstance.getSession();
    return databaseSession.find((driver: Driver) =>
      driver.driver_id === input.driver_id
    ) || null;
  }
}
