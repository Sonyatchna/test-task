import { Document } from 'mongoose';

export interface UserInterface {
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}

export type UserDocument = UserInterface & Document;
