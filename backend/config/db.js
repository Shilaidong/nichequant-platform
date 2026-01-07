const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/nichequant';
    console.log(`Attempting to connect to MongoDB...`);
    // Mask the password in logs
    const maskedURI = mongoURI.replace(/:([^:@]+)@/, ':****@');
    console.log(`URI: ${maskedURI}`);

    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
        throw new Error('Invalid MongoDB URI scheme. Expected mongodb:// or mongodb+srv://');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;