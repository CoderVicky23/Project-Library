// libraries
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// route controller libraries
const indexController = require("./../controllers/index");
const adminController = require("./../controllers/admin");

// get index page 
router
    .get("/", indexController.indexPage);

router
    .get("/getAllBooks" , indexController.getAllBooks);

router
    .get("/getSortedBooks" , indexController.getSortedBooks);

router
    .get("/getSortedAuthors" , indexController.getSortedAuthors);

router
    .post("/adminVerification", indexController.adminVerification);

router
    .get("/admin" , indexController.gettingAdmin);


// issue / withdraw book
router
    .post('/userCredentials' , adminController.userVerification);

router
    .post('/bookIdSearch' , adminController.bookIssueOnAvailability);

router
    .post('/booksIssuedByUser' , adminController.issuedBooksList);

router
    .post('/userBookWithdraw' , adminController.withdrawUserBook);


// add new member 
router
    .post('/addNewUser', adminController.addNewMember);


// add new book
router
    .post('/getBooklength' , adminController.getBookLength);

router
    .post('/addNewBook', adminController.addNewBook);

module.exports = router;













// .get("/", require(__dirname + "/../controllers/homePage").sendingMsg())