// imported libraries
const path = require("path");

// importing models
const BooksModel = require("./../models/books");
const adminModel = require("./../models/admin");
const userModel = require("./../models/users");

// rendering Home Page
exports.indexPage = (req, res) => {
    res.render('page/index');
}

// fetching all books
exports.getAllBooks = async (req, res) => {
    await BooksModel.find().then( (data) => {
        res.send(data);
    });
}

// admin verification
exports.adminVerification = async (req, res)=>{
    await adminModel.find().then( (data) => {
        let userCredentials = req.body;
        for (i=0 ; i<data.length ; i++) {
            if (data[i]['adminId'] == userCredentials['adminId']){
                if (data[i]['adminPassword'] == userCredentials['password']){
                    res.send({ nextUrl : '/admin'});
                    return
                }
                else {
                    res.send("Invalid Credentials");
                    return
                }
            }
        }
        res.send("Not Found");
        return
    })
}

// rendering admin page 
exports.gettingAdmin = (req, res) => {
    res.render('page/admin');
}