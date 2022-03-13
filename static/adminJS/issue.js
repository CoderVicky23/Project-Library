document.querySelector('.close').addEventListener('click', function(e){
    console.log(e.target);
    this.parentElement.style.display = 'none';
})
document.getElementById('userSearch').addEventListener('click', function() {
    let RollNo;
    let userEnteredId = document.getElementById('exampleInputuserId');
    if (userEnteredId.value == ''){
        document.querySelector('.UserFieldEmptyPop').style.display = 'block';
    }
    else if ( isNaN(userEnteredId.value) ){
        document.querySelector('.UserFieldNanPop').style.display = 'block';
    }
    else {
        async function gettingUsers(method, url, data){
            await new Promise( (resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.setRequestHeader('Content-Type' , 'application/json');
                xhr.onload = function() {
                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        console.log('Error Occured');
                    }
                }
                xhr.send(JSON.stringify(data));
            }).then( (para) => {
                let userInfo = document.getElementById('userInfo');
                let text = '';
                RollNo = para.rollno;
                text += `<div class="userName">
                            <span class="tag">Name</span>
                            <span class="tagEntry">${para.name}</span>
                        </div>
                        <div class="userRollno">
                            <span class="tag">Roll No</span>
                            <span="tagEntry">${para.rollno}</span>
                        </div>`;
                text += `<div class="issueWithdrawBtns mt-5">
                            <button type="button" class="btn btn-outline-primary" id="issueBook">Issue Book</button>
                            <button type="button" class="btn btn-outline-primary" id="withdrawBook">Withdraw Book</button>
                        </div>`;
                userInfo.innerHTML = text;
            })
            document.getElementById('issueBook').addEventListener('click', function() {
                let issueWithdrawField = document.querySelector('#spareContent');
                let text = `<form class="issueBookForm p-5">
                                <div class="form-group">
                                    <label for="issuebookidform">Book Id</label>
                                    <input type="text" class="form-control" id="issuebookidform" placeholder="Enter Book Id">
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="button" id="issueByBookId">Issue Book</button>
                                </div>
                            </form>`;
                issueWithdrawField.innerHTML = text;
                document.getElementById('issueByBookId').addEventListener('click',async () => {
                    let enteredBookId = document.getElementById('issuebookidform');
                    let bookIdObject = {bookid : enteredBookId.value , rollno : RollNo};
                    await new Promise( (resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('post','/bookIdSearch');
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.responseType = 'json';
                        xhr.onload = function () {
                            if (xhr.status == 200) {
                                resolve(xhr.response);
                            }
                            else {
                                reject('Error in checking the book Id');
                            }
                        }
                        xhr.send(JSON.stringify(bookIdObject));
                    }).then( (para) => {
                        alert(para.returned);
                        enteredBookId.value = '';
                    }).catch( (para) => {
                        console.log(para);
                    })
                })
            });
            let withdrawBookFunction = async function() {
                let withdrawIssueField = document.querySelector('#spareContent');
                await new Promise( (resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', '/booksIssuedByUser');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.responseType = 'json';
                    xhr.onload = function() {
                        if (xhr.status == 200) {
                            resolve(xhr.response);
                        }
                        else {
                            reject('Error While Fetching the Record of User');
                        }
                    }
                    xhr.send(JSON.stringify({rollno : RollNo}));
                }).then( (para) => {
                    if (para.length == 0){
                        withdrawIssueField.innerHTML = '<div class="emptyRecord text-center m-4">No Books Issued</div>';
                    }
                    else{
                        let text = `<div class="issuedBooksTable p-4">
                                    <table class="insideTable">
                                        <tr>
                                            <th>Book Id</th>
                                            <th>Issued Date</th>
                                            <th>Return Date</th>
                                            <th></th>
                                        </tr>`;
                        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric'};
                        for ( i=0 ; i<para.length ; i++ ) {
                            if (new Date() >= new Date(para[i].returnDate)){
                                text += `<tr>
                                            <td>${para[i].bookid}</td>
                                            <td>${new Date(para[i].issueDate).toLocaleDateString('en-US' , dateOptions)}</td>
                                            <td>${new Date(para[i].returnDate).toLocaleDateString('en-US', dateOptions)}</td>
                                            <td style="color:red">Submission Pending</td>
                                        </tr>`;
                            }
                            else {
                                text += `<tr>
                                            <td>${para[i].bookid}</td>
                                            <td>${new Date(para[i].issueDate).toLocaleDateString('en-US' , dateOptions)}</td>
                                            <td>${new Date(para[i].returnDate).toLocaleDateString('en-US', dateOptions)}</td>
                                            <td></td>
                                        </tr>`;
                            }
                        }
                        text += `</table></div>`;
                        text += `<form class="withdrawBookForm p-5">
                                    <div class="form-group">
                                        <label for="withdrawbookidform">Book Id</label>
                                        <input type="text" class="form-control" id="withdrawbookidform" placeholder="Enter Book Id">
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-outline-success my-2 my-sm-0" type="button" id="withdrawByBookId">Withdraw Book</button>
                                    </div>
                                </form>`;
                        withdrawIssueField.innerHTML = text;
                        document.getElementById('withdrawByBookId').addEventListener('click',async function() {
                            let withdrawBookId = document.getElementById('withdrawbookidform');
                            if (withdrawBookId.value == ''){
                                console.log("Form Cannot Be Empty");
                            }
                            else {
                                await new Promise( (resolve, reject) => {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('post', '/userBookWithdraw');
                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                    xhr.responseType = 'json';
                                    xhr.onload = function() {
                                        if (xhr.status == 200) {
                                            resolve(xhr.response);
                                        }
                                        else {
                                            reject("Error while withdrawing Book");
                                        }
                                    }
                                    xhr.send(JSON.stringify({bookid : withdrawBookId.value , rollno : RollNo}));
                                }).then( (para) => {
                                    alert("Book Withdrawn");
                                    withdrawBookFunction();
                                }).catch( (para) => {
                                    console.log(para);
                                })
                            }
                        })
                    }
                }).catch( (para) => {
                    console.log(para);
                })
                
            }
            document.getElementById('withdrawBook').addEventListener('click', withdrawBookFunction);
        }
        gettingUsers('post', '/userCredentials', [userEnteredId.value]);
    }
})

