import { BAD_REQUEST } from 'http-status-codes';

export default class BadRequest extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.code = BAD_REQUEST;
  }
};
