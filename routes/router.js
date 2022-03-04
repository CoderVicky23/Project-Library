// libraries
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// route controller libraries
const indexController = require("./../controllers/index");
const adminController = require("./../controllers/admin");

router
    .get("/", indexController.indexPage);

router
    .get("/getAllBooks" , indexController.getAllBooks);

router
    .post("/adminVerification", indexController.adminVerification);

router
    .get("/admin" , indexController.gettingAdmin);

router
    .post('/userCredentials' , adminController.userVerification);

router
    .post('/addNewUser', adminController.addNewMember);

router
    .post('/getBooklength' , adminController.getBookLength);

router
    .post('/addNewBook', adminController.addNewBook);

module.exports = router;













// .get("/", require(__dirname + "/../controllers/homePage").sendingMsg())