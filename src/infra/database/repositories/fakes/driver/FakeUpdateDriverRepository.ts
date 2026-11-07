import {UpdateDriverRepositoryInput, UpdateDriverRepositoryOutput, IUpdateDriverRepository} from "../../../../../domain/repositories/Driver/IUpdateDriverRepository";

export class FakeUpdateDriverRepository implements IUpdateDriverRepository {
  public async execute(
    input: UpdateDriverRepositoryInput,
  ): Promise<UpdateDriverRepositoryOutput> {
    return {
      "driver_id": "48d285df-1b80-44bc-a540-73148e02d22c",
      "name": "João Silva",
    };
  }
}
