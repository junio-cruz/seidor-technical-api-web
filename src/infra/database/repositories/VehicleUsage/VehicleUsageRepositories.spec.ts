import { databaseInstance } from '../../session';
import { Driver } from '../../../../domain/entities/Driver';
import { Vehicle } from '../../../../domain/entities/Vehicle';
import { VehicleUsage } from '../../../../domain/entities/VehicleUsage';
import { CreateVehicleUsageRepository } from './CreateVehicleUsageRepository';
import { FindVehicleUsageByDriverRepository } from './FindVehicleUsageByDriverRepository';
import { ListVehicleUsageRepository } from './ListVehicleUsageRepository';
import { UpdateVehicleUsageRepository } from './UpdateVehicleUsageRepository';

const driver: Driver = { driver_id: 'driver-1', name: 'Junio Cruz' };
const otherDriver: Driver = { driver_id: 'driver-2', name: 'Maria' };
const vehicle: Vehicle = {
  vehicle_id: 'vehicle-1',
  plate: 'ABC1234',
  mark: 'Chevrolet',
  color: 'Prata',
};
const vehicleUsage: VehicleUsage = {
  vehicle_usage_id: 'usage-1',
  driver,
  vehicle,
  use_reason: 'Teste',
  use_start_date: new Date('2025-08-05T22:19:33.755Z'),
  use_end_date: null,
};
const otherVehicleUsage: VehicleUsage = {
  ...vehicleUsage,
  vehicle_usage_id: 'usage-2',
  driver: otherDriver,
  use_start_date: new Date('2025-08-06T10:00:00.000Z'),
};

describe('VehicleUsage repositories', () => {
  beforeEach(() => {
    databaseInstance.updateSession([]);
  });

  describe('CreateVehicleUsageRepository', () => {
    it('should add the vehicle usage to the session and return it', async () => {
      const sut = new CreateVehicleUsageRepository();

      const result = await sut.execute(vehicleUsage);

      expect(result).toEqual(vehicleUsage);
      expect(databaseInstance.getSession()).toContainEqual(vehicleUsage);
    });
  });

  describe('FindVehicleUsageByDriverRepository', () => {
    it('should return the vehicle usage when the driver name matches', async () => {
      databaseInstance.updateSession([vehicleUsage]);
      const sut = new FindVehicleUsageByDriverRepository();

      const result = await sut.execute({ driver_name: 'Junio Cruz' });

      expect(result).toEqual(vehicleUsage);
    });

    it('should return null when the driver name does not match', async () => {
      databaseInstance.updateSession([vehicleUsage]);
      const sut = new FindVehicleUsageByDriverRepository();

      const result = await sut.execute({ driver_name: 'Unknown' });

      expect(result).toBeNull();
    });
  });

  describe('ListVehicleUsageRepository', () => {
    beforeEach(() => {
      databaseInstance.updateSession([vehicleUsage, otherVehicleUsage]);
    });

    it('should list vehicle usages with default pagination', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({});

      expect(result.page).toBe(1);
      expect(result.page_data).toHaveLength(2);
      expect(result.page_count).toBe(2);
      expect(result.all_count).toBe(2);
      expect(result.all_pages_count).toBe(1);
    });

    it('should list vehicle usages filtering by all fields', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({
        filter: {
          driver_id: 'driver-1',
          vehicle_id: 'vehicle-1',
          use_start_date: vehicleUsage.use_start_date,
          use_end_date: new Date('2025-08-07T00:00:00.000Z'),
        },
        pagination: { page: 1, page_size: 10 },
      });

      expect(result.page).toBe(1);
      expect(result.all_count).toBe(2);
    });

    it('should list vehicle usages filtering by driver_id only', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({ filter: { driver_id: 'driver-1' } });

      expect(result.page_data).toEqual([]);
    });

    it('should list vehicle usages filtering by vehicle_id only', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({ filter: { vehicle_id: 'vehicle-1' } });

      expect(result.page_data).toEqual([]);
    });

    it('should list vehicle usages filtering by use_start_date only', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({
        filter: { use_start_date: vehicleUsage.use_start_date },
      });

      expect(result.page_data).toHaveLength(1);
    });

    it('should paginate results', async () => {
      const sut = new ListVehicleUsageRepository();

      const result = await sut.execute({
        pagination: { page: 2, page_size: 1 },
      });

      expect(result.page).toBe(2);
      expect(result.page_data).toHaveLength(1);
    });
  });

  describe('UpdateVehicleUsageRepository', () => {
    it('should update the vehicle usage and return the updated data', async () => {
      databaseInstance.updateSession([vehicleUsage, otherVehicleUsage]);
      const sut = new UpdateVehicleUsageRepository();
      const endDate = new Date('2025-08-06T10:00:00.000Z');

      const result = await sut.execute({
        vehicle_usage_id: 'usage-1',
        to_update: { use_end_date: endDate },
      });

      expect(result).toMatchObject({
        vehicle_usage_id: 'usage-1',
        use_end_date: endDate,
      });
      expect(databaseInstance.getSession()).toContainEqual(
        expect.objectContaining({ vehicle_usage_id: 'usage-1', use_end_date: endDate }),
      );
    });

    it('should return null when the vehicle usage does not exist', async () => {
      databaseInstance.updateSession([vehicleUsage]);
      const sut = new UpdateVehicleUsageRepository();

      const result = await sut.execute({
        vehicle_usage_id: 'missing',
        to_update: { use_end_date: new Date() },
      });

      expect(result).toBeNull();
    });
  });
});
