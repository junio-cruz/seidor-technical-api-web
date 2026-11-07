
import {DeleteVehicleRepositoryInput, DeleteVehicleRepositoryOutput, IDeleteVehicleRepository} from "../../../../../domain/repositories/Vehicle/IDeleteVehicleRepository";

export class FakeDeleteVehicleRepository implements IDeleteVehicleRepository {
  public async execute(
    input: DeleteVehicleRepositoryInput,
  ): Promise<DeleteVehicleRepositoryOutput> {
    return {
      vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      plate:  "123456",
      mark: "Chevrolet",
      color: "Prata",
    }
  }
}
