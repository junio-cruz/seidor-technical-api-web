import {UpdateVehicleRepositoryInput, UpdateVehicleRepositoryOutput, IUpdateVehicleRepository} from "../../../../../domain/repositories/Vehicle/IUpdateVehicleRepository";

export class FakeUpdateVehicleRepository implements IUpdateVehicleRepository {
  public async execute(
    input: UpdateVehicleRepositoryInput,
  ): Promise<UpdateVehicleRepositoryOutput> {
    return {
      "vehicle_id": "48d285df-1b80-44bc-a540-73148e02d22c",
      "plate": "ABC1234",
      "mark": "Chevrolet",
      "color": "Prata",
    };
  }
}
