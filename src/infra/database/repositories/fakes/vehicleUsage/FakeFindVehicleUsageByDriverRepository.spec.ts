import { FakeFindVehicleUsageByDriverRepository } from './FakeFindVehicleUsageByDriverRepository';

describe('FakeFindVehicleUsageByDriverRepository', () => {
  it('should return a fixed vehicle usage', async () => {
    const sut = new FakeFindVehicleUsageByDriverRepository();

    const result = await sut.execute({ driver_name: 'any' });

    expect(result).not.toBeNull();
    expect(result?.driver.name).toBe('Junio Cruz');
    expect(result?.vehicle.plate).toBe('ABC1234');
    expect(result?.use_reason).toBe('Teste');
  });
});
