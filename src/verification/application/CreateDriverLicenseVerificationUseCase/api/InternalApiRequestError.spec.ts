import { InternalApiRequestError } from './InternalApiRequestError';

describe('InternalApiRequestError', () => {
  it('shold create', () => {
    const error = new InternalApiRequestError('message');
    expect(error).toBeTruthy();
    expect(error.message).toBe('message');
  });
});
