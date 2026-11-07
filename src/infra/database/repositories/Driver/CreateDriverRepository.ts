import { databaseInstance } from '../../session';
import {
  CreateDriverRepositoryInput,
  CreateDriverRepositoryOutput,
  ICreateDriverRepository,
} from '../../../../domain/repositories/Driver/ICreateDriverRepository';
import { Driver } from '../../../../domain/entities/Driver';

export class CreateDriverRepository implements ICreateDriverRepository {
  public async execute(
    input: CreateDriverRepositoryInput,
  ): Promise<CreateDriverRepositoryOutput> {
    const databaseSession: Driver[] = databaseInstance.getSession();
    databaseSession.push(input);
    return databaseSession.find((driver) => driver.driver_id === input.driver_id) as Driver;
  } 
}
