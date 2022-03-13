const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name : String,
    author : String,
    price : Number,
    quantity : Number,
    category : String,
    bookid : Number,
    avail : Number
})

let BooksModel = mongoose.model("books", bookSchema);

module.exports = BooksModel;