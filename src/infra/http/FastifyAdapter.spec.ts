import { FastifyAdapter } from './FastifyAdapter';
import { HttpOkResponse } from '../../presentation/http/response';
import { HttpBadRequestError } from '../../presentation/http/errors';
import { IHttpController } from '../../application/protocols/http/IHttp';

const okController: IHttpController = {
  handle: jest.fn().mockResolvedValue(new HttpOkResponse({ ok: true })),
};

const errorController: IHttpController = {
  handle: jest
    .fn()
    .mockResolvedValue(new HttpBadRequestError(['bad request'])),
};

async function withServer(
  setup: (sut: FastifyAdapter) => void,
  request: (baseUrl: string) => Promise<void>,
): Promise<void> {
  const sut = new FastifyAdapter();
  setup(sut);
  await sut.run(0);
  const address = sut.app.server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  try {
    await request(`http://localhost:${port}`);
  } finally {
    await sut.close();
  }
}

describe('FastifyAdapter', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NODE_ENV = 'LOCAL';
    process.env.LOG_LEVEL = 'info';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  it('should register routes and expose the fastify instance', () => {
    const sut = new FastifyAdapter();

    sut.route('get', '/test', okController);

    expect(sut.getInstance()).toBeDefined();
  });

  it('should respond with controller data on success', async () => {
    await withServer(
      sut => sut.route('get', '/test-ok', okController),
      async baseUrl => {
        const response = await fetch(`${baseUrl}/test-ok`);
        const body: any = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual({ status: 200, data: { ok: true } });
      },
    );
  });

  it('should respond with error details when controller returns HttpError', async () => {
    await withServer(
      sut => sut.route('get', '/test-error', errorController),
      async baseUrl => {
        const response = await fetch(`${baseUrl}/test-error`);
        const body: any = await response.json();

        expect(response.status).toBe(400);
        expect(body.status).toBe(400);
        expect(body.error.name).toBe('HttpBadRequestError');
        expect(body.error.message).toBe('BAD_REQUEST');
        expect(body.error.code).toEqual(['bad request']);
        expect(body.error.stack).toBeDefined();
      },
    );
  });

  it('should not expose stack when not running locally', async () => {
    process.env.NODE_ENV = 'PRD';
    await withServer(
      sut => sut.route('get', '/test-error-prod', errorController),
      async baseUrl => {
        const response = await fetch(`${baseUrl}/test-error-prod`);
        const body: any = await response.json();

        expect(response.status).toBe(400);
        expect(body.error.stack).toBeUndefined();
      },
    );
  });

  it('should run and close the server', async () => {
    const sut = new FastifyAdapter();

    const app = await sut.run(0);
    expect(app).toBeDefined();

    await sut.close();
  });

  it('should exit process when run fails', async () => {
    const sut = new FastifyAdapter();
    const listenSpy = jest.spyOn(sut.app, 'listen') as unknown as jest.Mock;
    listenSpy.mockRejectedValue(new Error('listen failed'));
    const exitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation((() => undefined) as never);

    await sut.run(3000);

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('should exit process when close fails', async () => {
    const sut = new FastifyAdapter();
    const closeSpy = jest.spyOn(sut.app, 'close') as unknown as jest.Mock;
    closeSpy.mockRejectedValue(new Error('close failed'));
    const exitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation((() => undefined) as never);

    await sut.close();

    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
