import { databaseConfig } from '../config/databaseConfig';
import mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';

export async function databaseBootstrap(): Promise<void> {
  await mongoose.connect(databaseConfig.connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  } as ConnectionOptions);
}
