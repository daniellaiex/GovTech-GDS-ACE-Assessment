import app from "./app";
import mongoose from 'mongoose';
import populateDb from "../dbinitscripts/populateDb";
import aggregateData from "../dbinitscripts/aggregateData";
import createUser from "../dbinitscripts/createUser";

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
  .then(async () => {
    console.log("Mongoose connected");
    await populateDb();
    aggregateData();
    createUser();
    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
