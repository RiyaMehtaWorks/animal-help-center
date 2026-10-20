// Parent: every error WE create carries an HTTP status code
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message); // hint: pass the message up to the built-in Error
    this.name = new.target.name;
  }
}

// 400: bad input from the client
export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, "Validation failed", details);
  }
}

// 404: the thing doesn't exist
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
  }
}
