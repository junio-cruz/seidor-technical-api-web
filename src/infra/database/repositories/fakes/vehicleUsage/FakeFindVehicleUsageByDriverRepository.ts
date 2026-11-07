import { FindVehicleUsageByDriverRepositoryInput, FindVehicleUsageByDriverRepositoryOutput,IFindVehicleUsageByDriverRepository } from "../../../../../domain/repositories/VehicleUsage/IFindVehicleUsageByDriverRepository";

export class FakeFindVehicleUsageByDriverRepository implements IFindVehicleUsageByDriverRepository {
  public async execute(
    input: FindVehicleUsageByDriverRepositoryInput,
  ): Promise<FindVehicleUsageByDriverRepositoryOutput> {
    return {
      "vehicle_usage_id": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
      driver: {
        "driver_id": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
        "name": "Junio Cruz",
      },
      vehicle: {
        "vehicle_id": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
        "plate": "ABC1234",
        "mark": "Chevrolet",
        "color": "Prata",
      },
      use_reason: "Teste",
      use_start_date: new Date("2025-08-05T22:19:33.755Z"),
      use_end_date: new Date("2025-08-05T22:19:49.928Z"),
    }
  }
}

