const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected');
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
};

module.exports = connection;