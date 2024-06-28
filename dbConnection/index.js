import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    return console.log("DB connected");
  } catch (error) {
    return console.log("Error in DB connection", error);
  }
};


export default dbConnection