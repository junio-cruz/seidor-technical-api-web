import {GetDriverRepositoryInput, GetDriverRepositoryOutput, IGetDriverRepository} from "../../../../../domain/repositories/Driver/IGetDriverRepository";

export class FakeGetDriverRepository implements IGetDriverRepository {
  public async execute(
    input: GetDriverRepositoryInput,
  ): Promise<GetDriverRepositoryOutput> {
    return {
      "driver_id": "30777c9d-4a8e-4897-962f-21be1d166fbe",
      "name": "Junio Cruz",
    }
  }
}
