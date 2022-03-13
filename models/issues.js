const mongoose = require("mongoose");

const issueSchema = mongoose.Schema( {
    rollno : Number,
    bookid : String,
    issueDate : {
        type : Date,
        default : () => {
            return new Date();
        }
    },
    returnDate : {
            type : Date,
            default : () => {
            return +new Date() + 7*24*60*60*1000;
        }
    }
});

const issueModel = mongoose.model('issues', issueSchema);

module.exports = issueModel;