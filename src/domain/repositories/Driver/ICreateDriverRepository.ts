import { Driver } from '../../entities/Driver';
  
export type CreateDriverRepositoryInput = Driver;

export type CreateDriverRepositoryOutput = Driver;
export interface ICreateDriverRepository {
  execute(
    input: CreateDriverRepositoryInput,
  ): Promise<CreateDriverRepositoryOutput>;
}
