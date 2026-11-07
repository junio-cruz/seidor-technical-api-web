import cors from '@fastify/cors';
import fastify, { FastifyInstance, HTTPMethods } from 'fastify';
import {
  HttpRequestContext,
  HttpServer,
  IHttpController,
} from '../../application/protocols/http/IHttp';
import { AppConfig } from '../config/AppConfig';
import { HttpError } from '../../presentation/http/errors';
import { HttpRequest } from '../../presentation/http/request';
import { IAppConfig } from '../../application/protocols/config/IAppConfig';

export class FastifyAdapter implements HttpServer {
  app: FastifyInstance;
  readonly appConfig: IAppConfig;

  constructor() {
    this.app = fastify();
    this.app.register(cors);
    this.appConfig = new AppConfig();
  }

  public route(
    method: HTTPMethods,
    path: string,
    controller: IHttpController,
  ): void {
    this.app.route({
      method,
      url: path,
      handler: async (request, reply) => {
        const ctx: HttpRequestContext = {
          status: 204,
        };
        const httpRequest: HttpRequest = {
          headers: request.headers || {},
          body: request.body || {},
          query: request.query || {},
          params: request.params || {},
        };
        const controllerResponse = await controller.handle(httpRequest);
        ctx.status = controllerResponse.statusCode;
        if (controllerResponse instanceof HttpError) {
          ctx.error = {
            name: controllerResponse.name,
            message: controllerResponse.message,
            code: controllerResponse.data,
            stack: this.appConfig.isLocal()
              ? controllerResponse.stack
              : undefined,
          };
        } else {
          ctx.data = controllerResponse.body;
        }
        reply.code(ctx.status);
        return ctx;
      },
    });
  }

  public async run(port: number): Promise<FastifyInstance> {
    try {
      await this.app.listen({
        port,
        listenTextResolver: () => `server is running on port: ${port}`,
      });
      return this.app;
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }
  public async close(): Promise<void> {
    try {
      await this.app.close();
      this.app.log.info('server was closed');
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }
  public getInstance(): FastifyInstance {
    return this.app;
  }
}
