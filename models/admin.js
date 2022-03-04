const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name : String,
    adminId : Number, 
    adminPassword : String
})

const adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;