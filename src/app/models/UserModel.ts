import mongoose from 'mongoose';
import { UserDocument } from '../interfaces/UserInterface';

const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    unique: true
  },
  refreshToken: {
    type: String,
    unique: true
  }
});

export default mongoose.model<UserDocument>('User', userSchema);
