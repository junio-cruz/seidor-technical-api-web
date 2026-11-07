import {GetVehicleRepositoryInput, GetVehicleRepositoryOutput, IGetVehicleRepository} from "../../../../../domain/repositories/Vehicle/IGetVehicleRepository";

export class FakeGetVehicleRepository implements IGetVehicleRepository {
  public async execute(
          input: GetVehicleRepositoryInput,
      ): Promise<GetVehicleRepositoryOutput> {
    return {
      vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      plate:  "123456",
      mark: "Chevrolet",
      color: "Prata",
    }
  }
}
