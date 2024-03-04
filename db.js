const mongoose = require('mongoose');
const {debugDB} = require('./debug.js')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/flyboy', {
        });
        debugDB('MongoDB Connected');
    } catch (error) {
        debugDB('Error connecting to MongoDB:', error);
    }
};
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        debugDB('MongoDB Disconnected');
    } catch (error) {
        debugDB('Error disconnecting from MongoDB:', error);
    }
};
module.exports = { connectDB, disconnectDB };