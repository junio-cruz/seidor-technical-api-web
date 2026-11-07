import {
  HttpBadRequestError,
  HttpConflictError,
  HttpError,
  HttpForbiddenError,
  HttpInternalServerError,
  HttpNotFoundError,
  HttpUnauthorizedError,
  HttpUnprocessableEntityError,
} from './errors';

describe('HttpError', () => {
  it('should create an HttpError with default status code', () => {
    const error = new HttpError('message', { any: 'data' });

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpError');
    expect(error.message).toBe('message');
    expect(error.data).toEqual({ any: 'data' });
    expect(error.statusCode).toBe(500);
    expect(error.stack).toBeDefined();
  });

  it('should create an HttpError with custom status code and stack', () => {
    const error = new HttpError('message', 'data', 'stack-trace', 418);

    expect(error.statusCode).toBe(418);
    expect(error.stack).toBeDefined();
  });
});

describe('HttpBadRequestError', () => {
  it('should create an HttpBadRequestError with defaults', () => {
    const error = new HttpBadRequestError(['field is required']);

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpBadRequestError');
    expect(error.message).toBe('BAD_REQUEST');
    expect(error.statusCode).toBe(400);
    expect(error.data).toEqual(['field is required']);
  });

  it('should create an HttpBadRequestError with custom values', () => {
    const error = new HttpBadRequestError(
      ['err'],
      'CustomName',
      'stack',
      'CustomMessage',
      400,
    );

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
  });
});

describe('HttpConflictError', () => {
  it('should create an HttpConflictError with defaults', () => {
    const error = new HttpConflictError({ conflict: true });

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpConflictError');
    expect(error.message).toBe('CONFLICT');
    expect(error.statusCode).toBe(409);
    expect(error.data).toEqual({ conflict: true });
  });

  it('should create an HttpConflictError with custom values', () => {
    const error = new HttpConflictError('data', 'stack', 'CustomName', 'CustomMessage', 409);

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
  });
});

describe('HttpForbiddenError', () => {
  it('should create an HttpForbiddenError with defaults', () => {
    const error = new HttpForbiddenError();

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpForbiddenError');
    expect(error.message).toBe('FORBIDDEN');
    expect(error.statusCode).toBe(403);
    expect(error.data).toBe('Authenticated user is not authorized');
  });

  it('should create an HttpForbiddenError with custom values', () => {
    const error = new HttpForbiddenError('custom-data', 'stack', 'CustomName', 'CustomMessage', 403);

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
    expect(error.data).toBe('custom-data');
  });
});

describe('HttpNotFoundError', () => {
  it('should create an HttpNotFoundError with defaults', () => {
    const error = new HttpNotFoundError('RESOURCE_NOT_FOUND');

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpNotFoundError');
    expect(error.message).toBe('NOT_FOUND');
    expect(error.statusCode).toBe(404);
    expect(error.data).toBe('RESOURCE_NOT_FOUND');
  });

  it('should create an HttpNotFoundError with custom values', () => {
    const error = new HttpNotFoundError('data', 'stack', 'CustomName', 'CustomMessage', 404);

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
  });
});

describe('HttpInternalServerError', () => {
  it('should create an HttpInternalServerError with defaults', () => {
    const cause = new Error('cause');
    const error = new HttpInternalServerError(cause);

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpInternalServerError');
    expect(error.message).toBe('INTERNAL_SERVER_ERROR');
    expect(error.statusCode).toBe(500);
    expect(error.data).toBe(cause);
  });

  it('should create an HttpInternalServerError with custom values', () => {
    const error = new HttpInternalServerError(
      new Error('cause'),
      'stack',
      'CustomName',
      'CustomMessage',
      500,
    );

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
  });
});

describe('HttpUnauthorizedError', () => {
  it('should create an HttpUnauthorizedError with defaults', () => {
    const error = new HttpUnauthorizedError();

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpUnauthorizedError');
    expect(error.message).toBe('UNAUTHORIZED');
    expect(error.statusCode).toBe(401);
    expect(error.data).toBe('User must be authenticated');
  });

  it('should create an HttpUnauthorizedError with custom values', () => {
    const error = new HttpUnauthorizedError('custom-data', 'stack', 'CustomName', 'CustomMessage', 401);

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
    expect(error.data).toBe('custom-data');
  });
});

describe('HttpUnprocessableEntityError', () => {
  it('should create an HttpUnprocessableEntityError with defaults', () => {
    const error = new HttpUnprocessableEntityError('INVALID_DATA');

    expect(error).toBeInstanceOf(HttpError);
    expect(error.name).toBe('HttpUnprocessableEntityError');
    expect(error.message).toBe('UNPROCESSABLE_ENTITY');
    expect(error.statusCode).toBe(422);
    expect(error.data).toBe('INVALID_DATA');
  });

  it('should create an HttpUnprocessableEntityError with custom values', () => {
    const error = new HttpUnprocessableEntityError('data', 'stack', 'CustomName', 'CustomMessage', 422);

    expect(error.name).toBe('CustomName');
    expect(error.message).toBe('CustomMessage');
  });
});
