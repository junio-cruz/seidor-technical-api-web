import {User} from '../../../domain/entities/User';
import {
  IUpdateUserRepository,
  UpdateUserRepositoryInput,
  UpdateUserRepositoryOutput,
} from '../../../domain/repositories/IUpdateUserRepository';
import {databaseInstance} from '../session';

export class UpdateUserRepository implements IUpdateUserRepository {
  public async execute(
    input: UpdateUserRepositoryInput,
  ): Promise<UpdateUserRepositoryOutput> {
    let response: User | any;
    const databaseSession = databaseInstance.getSession();
    const user_found = databaseSession.find((user) => user.user_id === input.user_id
        || input.user_id === user.email || input.user_id === user.auth_token) as User || null;
    if (!user_found){
      return user_found;
    }
    const database_session_updated = databaseSession.map(user => {
      if (user.user_id === input.user_id) {
        if (user.user_id === input.user_id) {
          response = {
            user_id: input.user_id,
            ...input.to_update,
          }
          return response
        }
      }
      return user;
    });
    databaseInstance.updateSession(database_session_updated);
    return response;
  }
}
