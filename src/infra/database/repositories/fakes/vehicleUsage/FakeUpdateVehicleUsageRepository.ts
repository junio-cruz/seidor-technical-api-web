import {
  IUpdateVehicleUsageRepository,
  UpdateVehicleUsageRepositoryInput,
  UpdateVehicleUsageRepositoryOutput
} from "../../../../../domain/repositories/VehicleUsage/IUpdateVehicleUsageRepository";

export class FakeUpdateVehicleUsageRepository implements IUpdateVehicleUsageRepository {
  public async execute(
    input: UpdateVehicleUsageRepositoryInput,
  ): Promise<UpdateVehicleUsageRepositoryOutput> {
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
        "color": "Preto",
      },
      use_reason: "Teste",
      use_start_date: new Date("2025-08-05T22:19:33.755Z"),
      use_end_date: new Date("2025-08-05T22:19:49.928Z"),
    };
  }
}
