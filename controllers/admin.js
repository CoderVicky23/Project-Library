
// importing models
const BooksModel = require("./../models/books");
const adminModel = require("./../models/admin");
const userModel = require("./../models/users");

// verifying user
exports.userVerification = async (req, res) => {
    let userEnteredId = req.body;
    let userId = await userModel.findOne( {rollno : userEnteredId[0]}).exec();
    if ( userId == null ){
        res.send("User Not Found");
    }
    else {
        res.send(userId);
    }
}

// add new member
exports.addNewMember = async (req, res) => {
    let olderUser = await userModel.find().sort({ rollno : -1 }).limit(1);
    let newUserRollNo = olderUser[0]['rollno'] + 1;
    const newUser = req.body;
    newUser.rollno = newUserRollNo;
    let newUserCred = new userModel(newUser);
    await newUserCred.save();
    res.send(newUserCred);
}

// getting length of books 
exports.getBookLength = async ( req, res) => {
    let bookCategory = req.body;
    let book = await BooksModel.countDocuments( {category : bookCategory[0]} );
    if ( book == null ){
        res.send('1');
    }
    else {
        res.send(`${book+1}`)
    }
}

// adding new book 
exports.addNewBook = async (req, res) => {
    let newBook = req.body;
    let newEntry = new BooksModel(newBook);
    await newEntry.save();
    res.send('Saved');
}