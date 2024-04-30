// import the nessesary packages
const mongoose = require("mongoose");
require("dotenv").config();

// make the database connection here from mongodb
const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database Connected Successfully !");
    })
    .catch((err) => {
      console.log("Error Occured Due To: " + err.message);
    });
};

module.exports = ConnectDB;
