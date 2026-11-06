import { Driver } from '../../entities/Driver';

export type DeleteDriverRepositoryInput = {
  driver_id: string;
};

export type DeleteDriverRepositoryOutput = Driver | null;
export interface IDeleteDriverRepository {
  execute(
    input: DeleteDriverRepositoryInput,
  ): Promise<DeleteDriverRepositoryOutput>;
}
