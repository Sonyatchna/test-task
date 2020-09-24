import { Document } from 'mongoose';

export interface TokenBlacklistInterface {
  token: string;
}

export type TokenBlacklistDocument = TokenBlacklistInterface & Document;
