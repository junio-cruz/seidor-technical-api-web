import {CreateDriverRepositoryInput, CreateDriverRepositoryOutput, ICreateDriverRepository} from "../../../../../domain/repositories/Driver/ICreateDriverRepository";

export class FakeCreateDriverRepository implements ICreateDriverRepository {
  public async execute(
    input: CreateDriverRepositoryInput,
  ): Promise<CreateDriverRepositoryOutput> {
    return {
      "driver_id": "30777c9d-4a8e-4897-962f-21be1d166fbe",
      "name": "Junio Cruz",
    }
  }
}
