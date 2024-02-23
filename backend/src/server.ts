import app from "./app";
// import env from "./util/validateEnv";
import mongoose from 'mongoose';
import populateDatabase from "../dbinitscripts/populateDB";
import aggregateData from "../dbinitscripts/aggregateData";

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
  .then(async () => {
    console.log("Mongoose connected");
    await populateDatabase();
    aggregateData();
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
