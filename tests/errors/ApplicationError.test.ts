import ApplicationError from '../../src/errors/ApplicationError';

describe('ApplicationError', () => {
  it('sets default error message', () => {
    const error = new ApplicationError();
    expect(error.message).toBe('An unknown application error occured');
  });

  it('sets 500 as default status code', () => {
    const error = new ApplicationError();
    expect(error.status).toBe(500);
  });

  it('sets APPLICATION_ERROR as default code', () => {
    const error = new ApplicationError();
    expect(error.status).toBe(500);
  });

  it('sets empty object as default details', () => {
    const error = new ApplicationError();
    expect(error.status).toBe(500);
  });

  it('sets message correctly', () => {
    const message = 'error message';
    const error = new ApplicationError(message);
    expect(error.message).toBe(message);
  });

  it('sets status correctly', () => {
    const status = 400;
    const error = new ApplicationError(undefined, status);
    expect(error.status).toBe(status);
  });

  it('sets code correctly', () => {
    const code = 'CUSTOM_CODE';
    const error = new ApplicationError(undefined, undefined, code);
    expect(error.code).toBe(code);
  });

  it('sets details correctly', () => {
    const details = { extra: 'info' };
    const error = new ApplicationError(undefined, undefined, undefined, details);
    expect(error.details).toBe(details);
  });
});
