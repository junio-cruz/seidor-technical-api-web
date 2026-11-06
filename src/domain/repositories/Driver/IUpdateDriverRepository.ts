import { Driver } from '../../entities/Driver';

export type UpdateDriverRepositoryInput = {
  driver_id: string;
  to_update: {
    name?: string;
  };
};

export type UpdateDriverRepositoryOutput = Driver | null;

export interface IUpdateDriverRepository {
  execute(
    input: UpdateDriverRepositoryInput,
  ): Promise<UpdateDriverRepositoryOutput>;
}
