import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";

export type VehicleUsage = {
  vehicle_usage_id: string;
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
  use_start_date: Date;
  use_end_date: Date | null;
};

export const vehicleUsageResolver = (vehicleUsage: VehicleUsage): VehicleUsage => {
  return {
    vehicle_usage_id: vehicleUsage.vehicle_usage_id,
    driver: vehicleUsage.driver,
    vehicle: vehicleUsage.vehicle,
    use_reason: vehicleUsage.use_reason,
    use_start_date: vehicleUsage.use_start_date,
    use_end_date: vehicleUsage.use_end_date,
  };
};
