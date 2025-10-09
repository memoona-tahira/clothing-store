import mongoose from 'mongoose';



const connectDB = async () => {
  try {
    console.log('Attempting to connect to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // stop the app if connection fails
  }
};

export default connectDB; 
