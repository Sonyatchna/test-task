import { BAD_REQUEST } from 'http-status-codes';

export default class NotValidToken extends Error {
  private code: number;
  constructor() {
    super();
    this.code = BAD_REQUEST;
    this.message = 'Invalid token';
  }
};
