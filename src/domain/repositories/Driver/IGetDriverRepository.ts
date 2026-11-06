import { Driver } from '../../entities/Driver';

export type GetDriverRepositoryInput = {
  driver_id: string;
};

export type GetDriverRepositoryOutput = Driver | null;
export interface IGetDriverRepository {
  execute(
    input: GetDriverRepositoryInput,
  ): Promise<GetDriverRepositoryOutput>;
}
