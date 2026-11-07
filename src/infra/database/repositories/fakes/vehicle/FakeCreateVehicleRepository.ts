
import {CreateVehicleRepositoryInput, CreateVehicleRepositoryOutput, ICreateVehicleRepository} from '../../../../../domain/repositories/Vehicle/ICreateVehicleRepository';

export class FakeCreateVehicleRepository implements ICreateVehicleRepository {
  public async execute(
    input: CreateVehicleRepositoryInput,
  ): Promise<CreateVehicleRepositoryOutput> {
    return {
      vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      plate:  "123456",
      mark: "Chevrolet",
      color: "Prata",
    }
  }
}
