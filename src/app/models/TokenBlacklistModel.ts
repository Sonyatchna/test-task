import mongoose from 'mongoose';
import { TokenBlacklistDocument } from '../interfaces/TokenBlacklistInterface';

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }
});

export default mongoose.model<TokenBlacklistDocument>('TokenBlacklist', tokenBlacklistSchema);
