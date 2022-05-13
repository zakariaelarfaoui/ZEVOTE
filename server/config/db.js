import mongoose from "mongoose";

const connectDb = async (url) => {
  return await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection Success.");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDb;
