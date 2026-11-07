import { LogLevel } from './Manager';
import {EventEmitter} from "events";
export class FakeLogger {
  private logManager: EventEmitter;

  private minLevel: number;

  private module: string;

  private readonly levels: { [key: string]: number } = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
  };

  constructor() {}
  public getChild(module: string): FakeLogger {
    const copy: FakeLogger = new (this.constructor as { new (): FakeLogger })();
    return copy;
  }

  public getLogger(moduleName: string): this {
    console.log(moduleName);
    return this;
  }


  public log(logLevel: LogLevel, message: string, data?: any): void {
    console.log(logLevel, message, data);
  }

  public trace(message: string, data?: any): void {
    console.log(message, data);
  }

  public debug(message: string, data?: any): void {
    console.log(message, data);
  }

  public info(message: string, data?: any): void {
    console.log(message, data);
  }

  public warn(message: string, data?: any): void {
    console.log(message, data);
  }

  public error(message: string, data?: any): void {
    console.log(message, data);
  }

  private levelToInt(minLevel: string): number {
    console.log(this.levels[minLevel.toLowerCase()]);
    return 99;
  }
}
