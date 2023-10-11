import mongoose from "mongoose";

const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  const isConnected = false;
  if (isConnected) {
    console.log("Mongodb already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("database connect succesfully");
  } catch (error) {
    console.log("error in databse connection=>>>", error.message);
  }
};

export default connectToDb;
