import { databaseInstance } from '../../session';
import { Vehicle } from '../../../../domain/entities/Vehicle';
import { CreateVehicleRepository } from './CreateVehicleRepository';
import { DeleteVehicleRepository } from './DeleteVehicleRepository';
import { GetVehicleRepository } from './GetVehicleRepository';
import { ListVehicleRepository } from './ListVehicleRepository';
import { UpdateVehicleRepository } from './UpdateVehicleRepository';

const vehicle: Vehicle = {
  vehicle_id: 'vehicle-1',
  plate: 'ABC1234',
  mark: 'Chevrolet',
  color: 'Prata',
};
const otherVehicle: Vehicle = {
  vehicle_id: 'vehicle-2',
  plate: 'XYZ9876',
  mark: 'Fiat',
  color: 'Preto',
};

describe('Vehicle repositories', () => {
  beforeEach(() => {
    databaseInstance.updateSession([]);
  });

  describe('CreateVehicleRepository', () => {
    it('should add the vehicle to the session and return it', async () => {
      const sut = new CreateVehicleRepository();

      const result = await sut.execute(vehicle);

      expect(result).toEqual(vehicle);
      expect(databaseInstance.getSession()).toContainEqual(vehicle);
    });
  });

  describe('GetVehicleRepository', () => {
    it('should return the vehicle when it exists', async () => {
      databaseInstance.updateSession([vehicle]);
      const sut = new GetVehicleRepository();

      const result = await sut.execute({ vehicle_id: 'vehicle-1' });

      expect(result).toEqual(vehicle);
    });

    it('should return null when the vehicle does not exist', async () => {
      databaseInstance.updateSession([vehicle]);
      const sut = new GetVehicleRepository();

      const result = await sut.execute({ vehicle_id: 'missing' });

      expect(result).toBeNull();
    });
  });

  describe('ListVehicleRepository', () => {
    beforeEach(() => {
      databaseInstance.updateSession([vehicle, otherVehicle]);
    });

    it('should list vehicles with default pagination', async () => {
      const sut = new ListVehicleRepository();

      const result = await sut.execute({});

      expect(result.page).toBe(1);
      expect(result.page_data).toHaveLength(2);
      expect(result.page_count).toBe(2);
      expect(result.all_count).toBe(2);
      expect(result.all_pages_count).toBe(1);
    });

    it('should list vehicles filtering by mark and color', async () => {
      const sut = new ListVehicleRepository();

      const result = await sut.execute({
        filter: { mark: 'Chevrolet', color: 'Prata' },
        pagination: { page: 1, page_size: 1 },
      });

      expect(result.page).toBe(1);
      expect(result.page_data).toHaveLength(2);
      expect(result.all_pages_count).toBe(2);
    });

    it('should list vehicles filtering by mark only', async () => {
      const sut = new ListVehicleRepository();

      const result = await sut.execute({ filter: { mark: 'Fiat' } });

      expect(result.page_data).toHaveLength(2);
    });

    it('should list vehicles filtering by color only', async () => {
      const sut = new ListVehicleRepository();

      const result = await sut.execute({ filter: { color: 'Preto' } });

      expect(result.page_data).toHaveLength(2);
    });

    it('should paginate results', async () => {
      const sut = new ListVehicleRepository();

      const result = await sut.execute({
        pagination: { page: 2, page_size: 1 },
      });

      expect(result.page).toBe(2);
      expect(result.page_data).toHaveLength(1);
    });
  });

  describe('UpdateVehicleRepository', () => {
    it('should update the vehicle and return the updated data', async () => {
      databaseInstance.updateSession([vehicle, otherVehicle]);
      const sut = new UpdateVehicleRepository();

      const result = await sut.execute({
        vehicle_id: 'vehicle-1',
        to_update: { color: 'Azul' },
      });

      expect(result).toEqual({
        vehicle_id: 'vehicle-1',
        color: 'Azul',
      });
      expect(databaseInstance.getSession()).toContainEqual({
        vehicle_id: 'vehicle-1',
        color: 'Azul',
      });
    });

    it('should return null when the vehicle does not exist', async () => {
      databaseInstance.updateSession([vehicle]);
      const sut = new UpdateVehicleRepository();

      const result = await sut.execute({
        vehicle_id: 'missing',
        to_update: { color: 'Azul' },
      });

      expect(result).toBeNull();
    });
  });

  describe('DeleteVehicleRepository', () => {
    it('should remove the vehicle and return it', async () => {
      databaseInstance.updateSession([vehicle, otherVehicle]);
      const sut = new DeleteVehicleRepository();

      const result = await sut.execute({ vehicle_id: 'vehicle-1' });

      expect(result).toEqual(vehicle);
      expect(databaseInstance.getSession()).toEqual([otherVehicle]);
    });

    it('should return null when the vehicle does not exist', async () => {
      databaseInstance.updateSession([vehicle]);
      const sut = new DeleteVehicleRepository();

      const result = await sut.execute({ vehicle_id: 'missing' });

      expect(result).toBeNull();
      expect(databaseInstance.getSession()).toEqual([vehicle]);
    });
  });
});
