import { UUIDGuidGenerator } from './UUIDGuidGenerator';

describe('UUIDGuidGenerator', () => {
  it('should generate a valid uuid v4', () => {
    const sut = new UUIDGuidGenerator();

    const uuid = sut.uuidV4();

    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('should generate different uuids on each call', () => {
    const sut = new UUIDGuidGenerator();

    expect(sut.uuidV4()).not.toBe(sut.uuidV4());
  });
});
