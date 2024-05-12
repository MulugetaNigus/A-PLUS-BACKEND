// import the nessessary file from the another module
const DepModel = require("../model/depModel");
const regModel = require("../model/regModel");

// import bcrypt module to work with encryt and decrypt your desire data
const bcrypt = require("bcrypt");

// for register route
const register = async (req, res) => {
  try { 
    // descructure the fields from the request body
    const { name, email, password } = req.body;
    
    // check weather the data inserted or not and decide your own logic
    if (!name || !email || !password) {
      return res.status(400).send({ message: "all fields are required !" });
    }

    // hash the password before submitted
    const hashedPassword = await bcrypt.hash(password, 12);

    // make your data more organized format to send into the database
    const userinfo = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    // add your data to the database
    const addUser = await regModel.create(userinfo);

    // check the operation work perfectly or not, 
    if (!addUser) {
      return res
        .status(400)
        .json({ message: "can not add the user by any means !" });
    }

    // get back the inserted data
    return res.status(200).json({ Current_Status: "successfully registered !", data: addUser });

    // handle further error
  } catch (error) {
    return res
      .status(400)
      .json({ message: "can not register the user due to : " + error.message });
  }
};

// for login route
const login = async (req, res) => {
  try {
    // get the user info
    const { email, password } = req.body;

    // find the user based on the above given data
    const getUser = await regModel.findOne({email});

    // find the user
    if (!getUser) {
      return res.status(400).send({ message: "user not found !" });
    }

    // decode the user password
    const decodePassword = await bcrypt.compare(password , getUser.password);

    // check the dcrypted data match the new one
    if (decodePassword) {
      return res.status(200).send({ message: "successfully Login !" });
      // if any confussion happen here handle it
    } else {
      return res.status(400).send({ message: "incorrect password !" });
    }
    // further error analysis
  } catch (error) {
    res.status(400).send({ message: "can not login !" });
  }
};

// to filter out the department
const getDepartment = async (req, res) => {
  try {
    // fetch the hole data
    const getDep = await DepModel.find({});

    // identify the search query from your database table
    const searchDepartment = req.query.department;

    // filter out based on your query
    const result = getDep.filter(
      (item) => item.department === searchDepartment
    );

    // if any data mutch your query save it and display it
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.json({
        message: "No data found for department: " + searchDepartment,
      });
    }
    // further error handling
  } catch (error) {
    return res
      .status(400)
      .send({ message: "an error occured due to: " + error.message });
  }
};

// export the function to access outside this file
module.exports = {
  register,
  login,
  getDepartment,
};
