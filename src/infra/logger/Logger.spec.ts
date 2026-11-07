import { EventEmitter } from 'events';
import { LogLevel, LogManager, logging } from './Manager';
import { Logger } from './Logger';
import { FakeLogger } from './FakeLogger';

describe('Logger', () => {
  let logManager: EventEmitter;
  let sut: Logger;

  beforeEach(() => {
    logManager = new EventEmitter();
    sut = new Logger(logManager, 'TestModule');
  });

  it('should emit a log entry for info level', () => {
    const spy = jest.fn();
    logManager.on('log', spy);

    sut.info('test message', { any: 'data' });

    expect(spy).toHaveBeenCalledWith({
      level: LogLevel.INFO,
      module: 'TestModule',
      message: 'test message',
      data: { any: 'data' },
    });
  });

  it('should emit a log entry without data', () => {
    const spy = jest.fn();
    logManager.on('log', spy);

    sut.info('test message');

    expect(spy).toHaveBeenCalledWith({
      level: LogLevel.INFO,
      module: 'TestModule',
      message: 'test message',
      data: undefined,
    });
  });

  it('should not emit when level is below minLevel', () => {
    const strictLogger = new Logger(logManager, 'Strict', LogLevel.ERROR);
    const spy = jest.fn();
    logManager.on('log', spy);

    strictLogger.info('should not log');
    strictLogger.error('should log');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ level: LogLevel.ERROR }),
    );
  });

  it('should not emit when minLevel is invalid', () => {
    const invalidLogger = new Logger(logManager, 'Invalid', 'not-a-level');
    const spy = jest.fn();
    logManager.on('log', spy);

    invalidLogger.error('should not log');

    expect(spy).not.toHaveBeenCalled();
  });

  it.each([
    ['trace', LogLevel.TRACE],
    ['debug', LogLevel.DEBUG],
    ['info', LogLevel.INFO],
    ['warn', LogLevel.WARN],
    ['error', LogLevel.ERROR],
  ] as const)('should log %s level', (method, level) => {
    const spy = jest.fn();
    logManager.on('log', spy);
    const permissiveLogger = new Logger(logManager, 'Permissive', LogLevel.TRACE);

    permissiveLogger[method]('message');

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ level, message: 'message' }),
    );
  });

  it('should create a child logger with composed module name', () => {
    const child = sut.getChild('ChildModule');
    const spy = jest.fn();
    logManager.on('log', spy);

    child.info('child message');

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ module: 'TestModule | ChildModule' }),
    );
  });
});

describe('LogManager', () => {
  let sut: LogManager;

  beforeEach(() => {
    // @ts-ignore - reset static minLevel between tests
    LogManager.minLevel = undefined;
    sut = new LogManager(LogLevel.DEBUG);
  });

  it('should return a logger with the instance minLevel', () => {
    const logger = sut.getLogger('Module');

    expect(logger).toBeInstanceOf(Logger);
  });

  it('should return a logger with the static minLevel when set', () => {
    // @ts-ignore - set static minLevel
    LogManager.minLevel = LogLevel.ERROR;
    const logger = sut.getLogger('Module');
    const spy = jest.fn();
    sut.on('log', spy);

    logger.info('should not log');
    logger.error('should log');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should register a log listener via onLogEntry', () => {
    const listener = jest.fn();

    const result = sut.onLogEntry(listener);
    const logger = sut.getLogger('Module');
    logger.info('hello');

    expect(result).toBe(sut);
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'hello' }),
    );
  });

  it('should register the console logger only once', () => {
    const first = sut.registerConsoleLogger();
    const second = sut.registerConsoleLogger();

    expect(first).toBe(sut);
    expect(second).toBe(sut);
  });

  describe('registerConsoleLogger output', () => {
    let consoleSpies: Record<string, jest.SpyInstance>;

    beforeEach(() => {
      consoleSpies = {
        trace: jest.spyOn(console, 'trace').mockImplementation(() => {}),
        debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
        info: jest.spyOn(console, 'info').mockImplementation(() => {}),
        warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
        error: jest.spyOn(console, 'error').mockImplementation(() => {}),
        log: jest.spyOn(console, 'log').mockImplementation(() => {}),
      };
      sut = new LogManager(LogLevel.TRACE).registerConsoleLogger();
    });

    afterEach(() => {
      Object.values(consoleSpies).forEach(spy => spy.mockRestore());
    });

    function emit(level: string, data?: any) {
      sut.emit('log', { level, module: 'Mod', message: 'msg', data });
    }

    it.each([
      [LogLevel.TRACE, 'trace'],
      [LogLevel.DEBUG, 'debug'],
      [LogLevel.INFO, 'info'],
      [LogLevel.WARN, 'warn'],
      [LogLevel.ERROR, 'error'],
    ] as const)('should console.%s the %s level with data', (level, method) => {
      emit(level, { foo: 'bar' });
      expect(consoleSpies[method]).toHaveBeenCalled();
    });

    it.each([
      [LogLevel.TRACE, 'trace'],
      [LogLevel.DEBUG, 'debug'],
      [LogLevel.INFO, 'info'],
      [LogLevel.WARN, 'warn'],
      [LogLevel.ERROR, 'error'],
    ] as const)('should console.%s the %s level without data', (level, method) => {
      emit(level);
      expect(consoleSpies[method]).toHaveBeenCalled();
    });

    it('should console.log unknown levels with data', () => {
      emit('unknown-level' as LogLevel, { foo: 'bar' });
      expect(consoleSpies.log).toHaveBeenCalled();
    });

    it('should console.log unknown levels without data', () => {
      emit('unknown-level' as LogLevel);
      expect(consoleSpies.log).toHaveBeenCalled();
    });
  });
});

describe('logging', () => {
  it('should create a LogManager with console logger registered', () => {
    const manager = logging(LogLevel.DEBUG);

    expect(manager).toBeInstanceOf(LogManager);
    expect(manager.getLogger('Module')).toBeInstanceOf(Logger);
  });
});

describe('FakeLogger', () => {
  let sut: FakeLogger;

  beforeEach(() => {
    sut = new FakeLogger();
  });

  it('should return a FakeLogger child', () => {
    expect(sut.getChild('child')).toBeInstanceOf(FakeLogger);
  });

  it('should return itself from getLogger', () => {
    expect(sut.getLogger('module')).toBe(sut);
  });

  it('should log through all level methods', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    sut.log(LogLevel.INFO, 'log message', { data: 1 });
    sut.trace('trace message');
    sut.debug('debug message');
    sut.info('info message');
    sut.warn('warn message');
    sut.error('error message');
    // @ts-ignore - private method
    sut.levelToInt('INFO');

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
