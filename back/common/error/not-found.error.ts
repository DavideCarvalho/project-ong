import { DomainError } from './domain.error';

interface NotFoundErrorConstructor {
  description: string;
  errorCode: string;
}

export class NotFoundError extends DomainError {
  constructor({ description, errorCode }: NotFoundErrorConstructor) {
    super(description);
    this.data = { description, errorCode };
  }
}
