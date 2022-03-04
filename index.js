// port using
const port = 4040;

// imported libraries
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyparser = require("body-parser");

// session-cookie
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

// imported js files
const router = require("./routes/router");

// connecting to Mongoose
mongoose.connect('mongodb://localhost:27017/Library')
console.log("Connected to Mongoose")

const app = express();

app.set('view engine', 'ejs');

// body parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// to serve the static folder
app.use("/static", express.static("static") );

app.use(router);

app.listen(port , () => {
    console.log(`Listening at port http://localhost:${port}`);
})