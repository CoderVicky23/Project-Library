const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    rollno : Number
})

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;