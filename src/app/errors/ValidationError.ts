import { UNPROCESSABLE_ENTITY } from 'http-status-codes';

export default class ValidationError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.code = UNPROCESSABLE_ENTITY;
  }
};
