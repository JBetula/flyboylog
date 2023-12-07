const mongoose = require('mongoose');
const {debugDB} = require('./debug.js')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/flyboy', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        debugDB('MongoDB Connected');
    } catch (error) {
        debugDB('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;