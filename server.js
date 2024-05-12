// import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import the databasae connection file
const ConnectDB = require("./utils/DatabaseConfig");

// import the main route
const route = require("./routes/depRoute");

// initialize the express app
const app = express();

// some middlewares
app.use(express.json());
app.use(cors());

// test route
app.use("/api/v1", route);

// app start here with the help of express
app.listen(process.env.PORT, () => {

  // database connectivity
  ConnectDB();

  // weather the app listening or not
  console.log("App Started On : " + process.env.PORT + " PORT");
});