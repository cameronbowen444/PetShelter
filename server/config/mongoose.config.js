const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is missing. Check Render environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("Established a connection to the database!"))
  .catch((err) => {
    console.log("Something went wrong when connecting to the database!", err);
    process.exit(1);
  });