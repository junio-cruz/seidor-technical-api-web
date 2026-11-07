import { databaseInstance } from '../../session';
import {
  DeleteDriverRepositoryInput,
  DeleteDriverRepositoryOutput,
  IDeleteDriverRepository,
} from '../../../../domain/repositories/Driver/IDeleteDriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class DeleteDriverRepository implements IDeleteDriverRepository {
  public async execute(
    input: DeleteDriverRepositoryInput  ,
  ): Promise<DeleteDriverRepositoryOutput> {
    const databaseSession: Driver[] = databaseInstance.getSession();
    let result: DeleteDriverRepositoryOutput = null;
    const driverIndex = databaseSession.findIndex((driver) => driver.driver_id === input.driver_id);
    if (driverIndex !== -1) {
      result = databaseSession[driverIndex];
      databaseSession.splice(driverIndex, 1);
    }
    return result;
  } 
}
