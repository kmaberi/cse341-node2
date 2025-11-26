const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connection;