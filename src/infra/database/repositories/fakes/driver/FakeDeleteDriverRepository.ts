import {DeleteDriverRepositoryInput, DeleteDriverRepositoryOutput, IDeleteDriverRepository} from "../../../../../domain/repositories/Driver/IDeleteDriverRepository";

export class FakeDeleteDriverRepository implements IDeleteDriverRepository {
  public async execute(
    input: DeleteDriverRepositoryInput,
  ): Promise<DeleteDriverRepositoryOutput> {
    return {
      "driver_id": "30777c9d-4a8e-4897-962f-21be1d166fbe",
      "name": "Junio Cruz",
    }
  }
}
