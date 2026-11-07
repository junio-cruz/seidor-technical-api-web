import { databaseInstance } from '../../session';
import {
  IUpdateDriverRepository,
  UpdateDriverRepositoryInput,
  UpdateDriverRepositoryOutput,
} from '../../../../domain/repositories/Driver/IUpdateDriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class UpdateDriverRepository implements IUpdateDriverRepository {
  public async execute(
    input: UpdateDriverRepositoryInput,
  ): Promise<UpdateDriverRepositoryOutput> {
    let response: any;
    const databaseSession = databaseInstance.getSession() as Driver[];
    const driver_found = databaseSession.find((driver) => driver.driver_id === input.driver_id) as any || null;
    if (!driver_found){
      return null;
    }
    const database_session_updated = databaseSession.map(driver => {
        if (driver.driver_id === input.driver_id) {
          response = {
            driver_id: input.driver_id,
            ...input.to_update,
          }
          return response
        }
      return  driver;
    }) as Driver[];
    databaseInstance.updateSession(database_session_updated);
    return response;
  }
}
