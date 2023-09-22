import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // https://www.mongodb.com/atlas
    // instructions how to get tkey https://www.youtube.com/watch?v=wm5gMKuwSYk (at 1:28)
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}