
export class DatabaseSession  {
  private clientSession: any[];

  constructor(private readonly entityModel:any[]) {
    this.clientSession = entityModel
  }

  public start(): boolean {
    this.clientSession = [];
    return !!this.clientSession
  }

  public getSession(): any[] {
    if (this.clientSession) {
      return this.clientSession;
    }
    throw new Error('START_DATABASE_ERROR');
  }

  public updateSession(input: any []): any[] {
    this.clientSession = input;
    return this.clientSession;
  }
}

export const databaseInstance = new DatabaseSession([]);

