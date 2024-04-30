// import the packages to help us to build our model
const mongoose = require("mongoose");

// model
const DepartmentModel = mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
});

const DepModel = mongoose.model("Departments", DepartmentModel);
module.exports = DepModel;
