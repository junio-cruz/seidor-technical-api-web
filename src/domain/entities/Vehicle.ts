export type Vehicle = {
  vehicle_id: string;
  plate: string;
  color: string;
  mark: string;
};

export const vehicleResolver = (vehicle: Vehicle): Vehicle => {
  return {
    vehicle_id: vehicle.vehicle_id,
    plate: vehicle.plate,
    color: vehicle.color,
    mark: vehicle.mark,
  };
};
