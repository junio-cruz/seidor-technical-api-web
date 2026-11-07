import { DatabaseSession, databaseInstance } from './session';

describe('DatabaseSession', () => {
  it('should initialize with the provided entity model', () => {
    const session = new DatabaseSession([{ id: 1 }]);

    expect(session.getSession()).toEqual([{ id: 1 }]);
  });

  it('should start a new empty session', () => {
    const session = new DatabaseSession([{ id: 1 }]);

    const result = session.start();

    expect(result).toBe(true);
    expect(session.getSession()).toEqual([]);
  });

  it('should return the session', () => {
    const session = new DatabaseSession([]);

    expect(session.getSession()).toEqual([]);
  });

  it('should throw when session was not started', () => {
    const session = new DatabaseSession([]);
    // @ts-ignore
    session.clientSession = null;

    expect(() => session.getSession()).toThrow('START_DATABASE_ERROR');
  });

  it('should update the session', () => {
    const session = new DatabaseSession([]);
    const newSession = [{ id: 2 }];

    const result = session.updateSession(newSession);

    expect(result).toBe(newSession);
    expect(session.getSession()).toBe(newSession);
  });
});

describe('databaseInstance', () => {
  it('should be an instance of DatabaseSession', () => {
    expect(databaseInstance).toBeInstanceOf(DatabaseSession);
    expect(databaseInstance.getSession()).toEqual([]);
  });
});
