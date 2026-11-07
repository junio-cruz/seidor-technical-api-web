import { AppConfig } from './AppConfig';

describe('AppConfig', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NODE_ENV = 'LOCAL';
    process.env.LOG_LEVEL = 'info';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('should load env values on construction', () => {
    const config = new AppConfig();

    expect(config.getValue('NODE_ENV')).toBe('LOCAL');
    expect(config.getValue('LOG_LEVEL')).toBe('info');
  });

  it('should throw when a required env is missing', () => {
    delete process.env.LOG_LEVEL;

    expect(() => new AppConfig()).toThrow(
      'ENV_NOT_DEFINED_OR_MISSING: LOG_LEVEL',
    );
  });

  it('should throw when getting an undefined value', () => {
    const config = new AppConfig();

    expect(() => config.getValue('UNKNOWN_KEY')).toThrow(
      'ENV_NOT_DEFINED_OR_MISSING: UNKNOWN_KEY',
    );
  });

  it('should return true for isLocal when NODE_ENV is LOCAL', () => {
    process.env.NODE_ENV = 'local';
    const config = new AppConfig();

    expect(config.isLocal()).toBe(true);
  });

  it('should return false for isLocal when NODE_ENV is not LOCAL', () => {
    process.env.NODE_ENV = 'PRD';
    const config = new AppConfig();

    expect(config.isLocal()).toBe(false);
  });

  it.each(['PRD', 'PROD', 'PRODUCTION'])(
    'should return true for isProduction when NODE_ENV is %s',
    env => {
      process.env.NODE_ENV = env;
      const config = new AppConfig();

      expect(config.isProduction()).toBe(true);
    },
  );

  it('should return false for isProduction when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'LOCAL';
    const config = new AppConfig();

    expect(config.isProduction()).toBe(false);
  });
});
