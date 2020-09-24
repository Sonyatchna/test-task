import mongoose from 'mongoose';

export function checkValidMongooseId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
