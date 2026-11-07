import * as Sentry from '@sentry/serverless';
import { ControllerErrorHandlerDecorator } from './ControllerErrorHandlerDecorator';
import { HttpOkResponse } from '../http/response';
import { HttpRequest } from '../http/request';
import {
  HttpConflictError,
  HttpError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnauthorizedError,
  HttpUnprocessableEntityError,
} from '../http/errors';
import { IHttpController } from '../../application/protocols/http/IHttp';
import { FakeLogger } from '../../infra/logger/FakeLogger';

jest.mock('@sentry/serverless', () => ({
  captureException: jest.fn(),
}));

let logger: FakeLogger;
let controller: { handle: jest.Mock };
let sut: ControllerErrorHandlerDecorator;

const request = new HttpRequest();

describe('ControllerErrorHandlerDecorator', () => {
  beforeEach(() => {
    logger = new FakeLogger();
    controller = { handle: jest.fn() };
    // @ts-ignore
    sut = new ControllerErrorHandlerDecorator(logger, controller as IHttpController);
    jest.clearAllMocks();
  });

  it('should return the controller response when it succeeds', async () => {
    const response = new HttpOkResponse({ ok: true });
    controller.handle.mockResolvedValue(response);

    const result = await sut.handle(request);

    expect(result).toBe(response);
    expect(controller.handle).toHaveBeenCalledWith(request);
  });

  it.each([
    'USER_NOT_CONFIRMED',
    'NotAuthorizedException',
    'NotAuthorizedException: Invalid Refresh Token',
    'USER_NOT_AUTHORIZED',
    'ADMIN_USER_NOT_AUTHORIZED',
  ])('should return HttpUnauthorizedError for message %s', async message => {
    controller.handle.mockRejectedValue(new Error(message));

    const result = await sut.handle(request);

    expect(result).toBeInstanceOf(HttpUnauthorizedError);
    expect((result as HttpError).data).toBe(message);
  });

  it.each(['USER_NOT_FOUND', 'ADMIN_USER_NOT_FOUND'])(
    'should return HttpNotFoundError for message %s',
    async message => {
      controller.handle.mockRejectedValue(new Error(message));

      const result = await sut.handle(request);

      expect(result).toBeInstanceOf(HttpNotFoundError);
      expect((result as HttpError).data).toBe(message);
    },
  );

  it('should return HttpConflictError for USER_ALREADY_EXISTS', async () => {
    controller.handle.mockRejectedValue(new Error('USER_ALREADY_EXISTS'));

    const result = await sut.handle(request);

    expect(result).toBeInstanceOf(HttpConflictError);
    expect((result as HttpError).data).toBe('USER_ALREADY_EXISTS');
  });

  it.each(['SIGNUP_ALREADY_VALIDATED', 'USER_WITHOUT_PHOTO'])(
    'should return HttpUnprocessableEntityError for message %s',
    async message => {
      controller.handle.mockRejectedValue(new Error(message));

      const result = await sut.handle(request);

      expect(result).toBeInstanceOf(HttpUnprocessableEntityError);
      expect((result as HttpError).data).toBe(message);
    },
  );

  it('should return HttpInternalServerError for unknown errors', async () => {
    const error = new Error('something went wrong');
    controller.handle.mockRejectedValue(error);
    const spyError = jest.spyOn(FakeLogger.prototype, 'error');

    const result = await sut.handle(request);

    expect(result).toBeInstanceOf(HttpInternalServerError);
    expect(spyError).toHaveBeenCalledWith('Internal Server Error', error);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });
});
