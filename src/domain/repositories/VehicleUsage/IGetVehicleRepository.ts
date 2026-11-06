import { User } from '../entities/User';

export type GetUserRepositoryInput = {
  user_id: string;
};

export type GetUserRepositoryOutput = User | null;

export interface IGetUserRepository {
  execute(input: GetUserRepositoryInput): Promise<GetUserRepositoryOutput>;
}
