import { FakeAppConfig } from './FakeAppConfig';

describe('FakeAppConfig', () => {
  let sut: FakeAppConfig;

  beforeEach(() => {
    sut = new FakeAppConfig();
  });

  it('should return a value for any key', () => {
    expect(sut.getValue('ANY_KEY')).toBe('value');
  });

  it('should return true for isLocal', () => {
    expect(sut.isLocal()).toBe(true);
  });

  it('should return true for isProduction', () => {
    expect(sut.isProduction()).toBe(true);
  });
});
