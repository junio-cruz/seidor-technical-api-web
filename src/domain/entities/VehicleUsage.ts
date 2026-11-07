import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";

export type VehicleUsage = {
  vehicle_usage_id: string;
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
  useStartDate: Date;
  useEndDate: Date;
};

export const vehicleUsageResolver = (vehicleUsage: VehicleUsage): VehicleUsage => {
  return {
    vehicle_usage_id: vehicleUsage.vehicle_usage_id,
    driver: vehicleUsage.driver,
    vehicle: vehicleUsage.vehicle,
    use_reason: vehicleUsage.use_reason,
    useStartDate: vehicleUsage.useStartDate,
    useEndDate: vehicleUsage.useEndDate,
  };
};
