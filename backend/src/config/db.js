const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
        process.exit(1);
    }
}

module.exports = connectDB;
