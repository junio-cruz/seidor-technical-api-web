import { Vehicle } from "./Vehicle";
import { Driver } from "./Driver";

export type VehicleUsage = {
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
  useStartDate: Date;
  useEndDate: Date;
};

export const vehicleUsageResolver = (vehicleUsage: VehicleUsage): VehicleUsage => {
  return {
    driver: vehicleUsage.driver,
    vehicle: vehicleUsage.vehicle,
    use_reason: vehicleUsage.use_reason,
    useStartDate: vehicleUsage.useStartDate,
    useEndDate: vehicleUsage.useEndDate,
  };
};
