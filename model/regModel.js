// import the mongoode pack...
const mongoose = require("mongoose");

// make the actual model to send and recieve the data
const registerModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

// crate the database using the above Schema
const regModel = mongoose.model( "users" , registerModel);

// export the model to work with send recieve the data
module.exports = regModel;