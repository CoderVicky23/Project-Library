
// importing models
const BooksModel = require("./../models/books");
const adminModel = require("./../models/admin");
const userModel = require("./../models/users");
const issueModel = require("./../models/issues");



// issue/withdraw

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

// checking availability of book and issuing the book
exports.bookIssueOnAvailability = async (req, res) => {
    let userEnteredBookId = req.body;
    let bookreturned = await BooksModel.findOne({bookid : userEnteredBookId.bookid}).exec();
    if (bookreturned == null) {
        res.send({returned :"Book Id invalid"});
    }
    else {
        if (bookreturned.avail > 0){
            let afterIssueBookAvail = bookreturned.avail - 1;
            await BooksModel.updateOne( {bookid : userEnteredBookId.bookid} , {
                avail : afterIssueBookAvail
            })
            let bookIssue = new issueModel(userEnteredBookId);
            await bookIssue.save();
            res.send({returned : 'Book Issued!'});
        }
        else {
            res.send( {returned : 'Book not available'});
        }
    }
}

// list of all books issued by the user

exports.issuedBooksList = async function(req, res) {
    let reqBody = req.body;
    let listOfBooks = await issueModel.find(reqBody);
    res.send(listOfBooks);
}

// withdraw book
exports.withdrawUserBook = async function(req, res) {
    let reqBody = req.body;
    let reqBodyBookid = reqBody.bookid;
    let result = await issueModel.deleteOne(reqBody);
    if (result == null) {
        res.send({returned : 'Not Found'});
    }
    else {
        await BooksModel.updateOne({bookid : reqBodyBookid} , { $inc : {avail : 1}}).exec();
        res.send({returned : 'Book Withdrawn Successfully'});
    }
}



// add new Member 

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





// add new book

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