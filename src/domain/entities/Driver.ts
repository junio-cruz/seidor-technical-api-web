export type Driver = {
  driver_id: string;
  name: string;
};

export const driverResolver = (driver: Driver): Driver => {
  return {
    driver_id: driver.driver_id,
    name: driver.name,
  };
};
