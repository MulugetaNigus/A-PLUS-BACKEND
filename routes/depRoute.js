// import express
const express = require("express");

// import the neccessary file from the another module
const {
  register,
  login,
  getDepartment,
} = require("../controller/Enginecontroller");

// get from the express packages for the route
const route = express.Router();

// ROUTES
route.get("/search", getDepartment);
route.post("/register", register);
route.post("/login", login);

module.exports = route;
