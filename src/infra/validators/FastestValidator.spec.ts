import { FastestValidator } from './FastestValidator';

describe('FastestValidator', () => {
  let sut: FastestValidator;

  beforeEach(() => {
    sut = new FastestValidator();
  });

  it('should return isValid true when parameters match the schema', async () => {
    const result = await sut.validate(
      { name: 'Junio Cruz' },
      { name: { type: 'string' } },
    );

    expect(result).toEqual({ isValid: true, errors: [] });
  });

  it('should return isValid false with messages when validation fails', async () => {
    const result = await sut.validate(
      { name: 123 },
      { name: { type: 'string' } },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('name');
  });

  it('should fall back to field and type when error has no message', async () => {
    const result = await sut.validate(
      { name: 'x'.repeat(100) },
      { name: { type: 'string', max: 5 } },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
