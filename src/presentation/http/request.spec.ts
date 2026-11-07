import { HttpRequest } from './request';

describe('HttpRequest', () => {
  it('should create an HttpRequest without parameters', () => {
    const request = new HttpRequest();

    expect(request.headers).toBeUndefined();
    expect(request.context).toBeUndefined();
    expect(request.params).toBeUndefined();
    expect(request.body).toBeUndefined();
    expect(request.query).toBeUndefined();
    expect(request.state).toBeUndefined();
  });

  it('should create an HttpRequest with all parameters', () => {
    const request = new HttpRequest(
      { authorization: 'Bearer token' },
      { requestId: '123' },
      { id: '1' },
      { name: 'Junio' },
      { page: 1 },
      { user: 'admin' },
    );

    expect(request.headers).toEqual({ authorization: 'Bearer token' });
    expect(request.context).toEqual({ requestId: '123' });
    expect(request.params).toEqual({ id: '1' });
    expect(request.body).toEqual({ name: 'Junio' });
    expect(request.query).toEqual({ page: 1 });
    expect(request.state).toEqual({ user: 'admin' });
  });
});
