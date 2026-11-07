import {
  HttpCreatedResponse,
  HttpOkResponse,
  HttpRedirectResponse,
  HttpResponse,
} from './response';

describe('HttpResponse', () => {
  it('should create an HttpResponse', () => {
    const response = new HttpResponse({ data: 'value' }, 202);

    expect(response.body).toEqual({ data: 'value' });
    expect(response.statusCode).toBe(202);
  });
});

describe('HttpOkResponse', () => {
  it('should create an HttpOkResponse with status 200', () => {
    const response = new HttpOkResponse({ data: 'value' });

    expect(response).toBeInstanceOf(HttpResponse);
    expect(response.body).toEqual({ data: 'value' });
    expect(response.statusCode).toBe(200);
  });
});

describe('HttpCreatedResponse', () => {
  it('should create an HttpCreatedResponse with status 201', () => {
    const response = new HttpCreatedResponse({ data: 'value' });

    expect(response).toBeInstanceOf(HttpResponse);
    expect(response.body).toEqual({ data: 'value' });
    expect(response.statusCode).toBe(201);
  });
});

describe('HttpRedirectResponse', () => {
  it('should create an HttpRedirectResponse with status 301', () => {
    const response = new HttpRedirectResponse({ url: '/new-location' });

    expect(response).toBeInstanceOf(HttpResponse);
    expect(response.body).toEqual({ url: '/new-location' });
    expect(response.statusCode).toBe(301);
  });
});
