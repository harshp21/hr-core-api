import { HttpStatus } from "@shared/constants/httpStatus";

class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly errorCode: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
   constructor(
    public readonly errorCode: string,
    message: string,
  ) {
    super(message, errorCode, HttpStatus.NOT_FOUND);
  }
}

class ConflictError extends AppError {

  constructor(
    public readonly errorCode: string,
    message: string,
  ) {
    super(message, errorCode, HttpStatus.CONFLICT);
  }
}


class ValidationError extends AppError {
  constructor(
    public readonly errorCode: string,
    message: string,
  ) {
    super(message, errorCode, HttpStatus.BAD_REQUEST);
  }
}

export { AppError, ConflictError, NotFoundError, ValidationError };
