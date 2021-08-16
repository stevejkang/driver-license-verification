export class InternalApiRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InternalApiRequestError';
  }
}
