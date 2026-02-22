
import mongoose from 'mongoose';
import { DB_URL } from '../../config/config.service.js';
import { UserModel } from './model/user.model.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
        await UserModel.syncIndexes();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        
    }}