import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export default class UnexpectedError extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.code = INTERNAL_SERVER_ERROR;
  }
};
