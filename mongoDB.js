import mongoose from 'mongoose'

const MONGO_URI = "mongodb+srv://akashkobal18_db_user:JhMYS02xQ436pNw1@cluster0.vjgch2t.mongodb.net/?appName=Cluster0"
if (!MONGO_URI) {
  throw new Error("url not found")
}


let isConnected = false;

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;

    if (isConnected) {
      console.log("called connectDB")
      console.log(`MongoDB connected to host: ${conn.connection.host}`)
    } else {
      console.error(`MongoDB connection failed: ${err.message}`);

    }
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    throw err;
  }
};

export default connectDB;