import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "There is no connection string avialen in process.env.MONGO_CLIENT"
      );
    }

    const con = mongoose.connect(conStr);

    con && console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
