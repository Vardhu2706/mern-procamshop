import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.green.inverse);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit();
  }
};

export default connectDB;
