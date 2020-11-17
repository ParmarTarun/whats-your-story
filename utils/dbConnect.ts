import mongoose from "mongoose";
declare const process: {
  env: {
    SECRET_KEY: string;
    MONGO_URI: string;
  };
};

const connection = {
  isConnected: 0,
};

const dbConnect = async () => {
  if (connection.isConnected) return;
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
