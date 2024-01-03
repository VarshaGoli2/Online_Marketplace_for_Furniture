const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://ndp:${process.env.MONGO_PASSWORD}@cluster0.arg5c.mongodb.net/WPL_Project?retryWrites=true&w=majority`);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process
        process.exit(1);
    }
};

module.exports = connectDB;