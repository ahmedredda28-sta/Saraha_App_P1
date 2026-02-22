export class CustomException extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomException';
  }
}

export function conflictException(message) {
  const error = new Error(message);
  error.name = 'ConflictException';
  error.cause = { status: 409 };
  return error;
}
