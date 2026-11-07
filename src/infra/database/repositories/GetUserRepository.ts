import {
  GetUserRepositoryInput,
  GetUserRepositoryOutput,
  IGetUserRepository,
} from '../../../domain/repositories/IGetUserRepository';
import { databaseInstance } from '../session';
import { User } from '../../../domain/entities/User';

export class GetUserRepository implements IGetUserRepository {
  public async execute(
      input: GetUserRepositoryInput,
  ): Promise<GetUserRepositoryOutput> {
    const databaseSession = databaseInstance.getSession();
    console.log(databaseSession);
    return databaseSession.find((user: User) =>
        (user.user_id === input.user_id || user.auth_token === input.user_id || user.email === input.user_id)) || null
  }
}
