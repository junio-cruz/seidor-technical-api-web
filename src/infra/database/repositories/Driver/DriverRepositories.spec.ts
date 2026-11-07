import { databaseInstance } from '../../session';
import { Driver } from '../../../../domain/entities/Driver';
import { CreateDriverRepository } from './CreateDriverRepository';
import { DeleteDriverRepository } from './DeleteDriverRepository';
import { GetDriverRepository } from './GetDriverRepository';
import { ListDriversRepository } from './ListDriverRepository';
import { UpdateDriverRepository } from './UpdateDriverRepository';

const driver: Driver = { driver_id: 'driver-1', name: 'Junio Cruz' };
const otherDriver: Driver = { driver_id: 'driver-2', name: 'Maria' };

describe('Driver repositories', () => {
  beforeEach(() => {
    databaseInstance.updateSession([]);
  });

  describe('CreateDriverRepository', () => {
    it('should add the driver to the session and return it', async () => {
      const sut = new CreateDriverRepository();

      const result = await sut.execute(driver);

      expect(result).toEqual(driver);
      expect(databaseInstance.getSession()).toContainEqual(driver);
    });
  });

  describe('GetDriverRepository', () => {
    it('should return the driver when it exists', async () => {
      databaseInstance.updateSession([driver]);
      const sut = new GetDriverRepository();

      const result = await sut.execute({ driver_id: 'driver-1' });

      expect(result).toEqual(driver);
    });

    it('should return null when the driver does not exist', async () => {
      databaseInstance.updateSession([driver]);
      const sut = new GetDriverRepository();

      const result = await sut.execute({ driver_id: 'missing' });

      expect(result).toBeNull();
    });
  });

  describe('ListDriversRepository', () => {
    beforeEach(() => {
      databaseInstance.updateSession([driver, otherDriver]);
    });

    it('should list drivers with default pagination', async () => {
      const sut = new ListDriversRepository();

      const result = await sut.execute({});

      expect(result.page).toBe(1);
      expect(result.page_data).toHaveLength(2);
      expect(result.page_count).toBe(2);
      expect(result.all_count).toBe(2);
      expect(result.all_pages_count).toBe(1);
    });

    it('should list drivers filtering by name', async () => {
      const sut = new ListDriversRepository();

      const result = await sut.execute({
        filter: { name: 'Junio' },
        pagination: { page: 1, page_size: 1 },
      });

      expect(result.page).toBe(1);
      expect(result.page_data).toHaveLength(2);
      expect(result.all_pages_count).toBe(2);
    });

    it('should paginate results', async () => {
      const sut = new ListDriversRepository();

      const result = await sut.execute({
        pagination: { page: 2, page_size: 1 },
      });

      expect(result.page).toBe(2);
      expect(result.page_data).toHaveLength(1);
    });
  });

  describe('UpdateDriverRepository', () => {
    it('should update the driver and return the updated data', async () => {
      databaseInstance.updateSession([driver, otherDriver]);
      const sut = new UpdateDriverRepository();

      const result = await sut.execute({
        driver_id: 'driver-1',
        to_update: { name: 'Junio Updated' },
      });

      expect(result).toEqual({
        driver_id: 'driver-1',
        name: 'Junio Updated',
      });
      expect(databaseInstance.getSession()).toContainEqual({
        driver_id: 'driver-1',
        name: 'Junio Updated',
      });
    });

    it('should return null when the driver does not exist', async () => {
      databaseInstance.updateSession([driver]);
      const sut = new UpdateDriverRepository();

      const result = await sut.execute({
        driver_id: 'missing',
        to_update: { name: 'Nobody' },
      });

      expect(result).toBeNull();
    });
  });

  describe('DeleteDriverRepository', () => {
    it('should remove the driver and return it', async () => {
      databaseInstance.updateSession([driver, otherDriver]);
      const sut = new DeleteDriverRepository();

      const result = await sut.execute({ driver_id: 'driver-1' });

      expect(result).toEqual(driver);
      expect(databaseInstance.getSession()).toEqual([otherDriver]);
    });

    it('should return null when the driver does not exist', async () => {
      databaseInstance.updateSession([driver]);
      const sut = new DeleteDriverRepository();

      const result = await sut.execute({ driver_id: 'missing' });

      expect(result).toBeNull();
      expect(databaseInstance.getSession()).toEqual([driver]);
    });
  });
});
