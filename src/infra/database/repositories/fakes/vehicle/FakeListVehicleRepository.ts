import {
  IListVehicleRepository,
  ListVehicleRepositoryInput,
  ListVehicleRepositoryOutput,
} from '../../../../../domain/repositories/Vehicle/IListVehicleRepository';

export class FakeListVehiclesRepository implements IListVehicleRepository {
  public async execute(
    input: ListVehicleRepositoryInput,
  ): Promise<ListVehicleRepositoryOutput> {
    return {
      "page": 1,
      "page_data":  [
        {
      vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      plate:  "ABC1234",
      mark: "Chevrolet",
      color: "Prata",
    }   ,
        {
      vehicle_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      plate:  "BBA6543",
      mark: "Fiat",
      color: "Branco",
    }
      ],
      "page_count": 2,
      "all_count": 2,
      "all_pages_count": 1
    }
  }
}
