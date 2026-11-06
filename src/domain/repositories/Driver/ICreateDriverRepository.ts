import { Driver } from '../../entities/Driver';
  
export type CreateDriverRepositoryInput = {
  name: string;
};

export type CreateDriverRepositoryOutput = Driver;
export interface ICreateDriverRepository {
  execute(
    input: CreateDriverRepositoryInput,
  ): Promise<CreateDriverRepositoryOutput>;
}
