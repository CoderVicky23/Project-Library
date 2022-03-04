document.getElementById('bookAdd').addEventListener('click' , function() {
    let bookName = document.getElementById('exampleInputBookName');
    let bookAuthor = document.getElementById('exampleBookAuthor');
    let bookCategory = document.getElementById('exampleBookCategory');
    let bookPrice = document.getElementById('exampleBookPrice');
    let bookQuantity = document.getElementById('exampleBookQuantity');
    let bookid = 0;
    if ( bookName.value == '' && bookAuthor.value == '' && bookCategory.value == '' && bookPrice.value == '' && bookQuantity.value == ''){
        document.querySelector('.addBookFieldEmptyPop').style.display = 'block';
        setTimeout( () => {
            document.querySelector('.addBookFieldEmptyPop').style.display = 'none';
        }, 3000);
    }
    else if ( isNaN(bookName.value) && isNaN(bookAuthor.value) && isNaN(bookCategory.value) && !(isNaN(bookPrice.value)) && !(isNaN(bookQuantity.value))){
        let dataBody = { name : bookName.value , author : bookAuthor.value , category : bookCategory.value , price : bookPrice.value , quantity : bookQuantity.value , avail : bookQuantity.value};
        async function generatingBookId(dataBody){
            const subjectId = { maths : 11000 , cs : 12000 , english : 13000 , geography : 14000 , hindi : 15000 , psychology : 16000 , chemistry : 17000 , biology : 18000 , physics : 19000 };
            for ( const key in subjectId ){
                if (key == dataBody.category) {
                    bookid = subjectId[key];
                    break
                }
            }
            await new Promise( (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('post' , '/getBooklength');
                xhr.setRequestHeader('Content-Type' , 'application/json');
                xhr.responseType = 'json';
                xhr.onload = function () {
                    if ( xhr.status == 200 ) {
                        resolve(xhr.response);
                    }
                    else {
                        reject('Error');
                    }
                }
                xhr.send(JSON.stringify([dataBody.category]));
            }).then( (para) => {
                bookid += parseInt(para);
                dataBody.bookid = bookid;
                let prom = new Promise( (resolve, reject) => {
                    let xr = new XMLHttpRequest();
                    xr.open('post', '/addNewBook');
                    xr.setRequestHeader('Content-Type', 'application/json');
                    // xr.responseType = 'json';
                    xr.onload = function () {
                        if (xr.status == 200) {
                            resolve(xr.response);
                        }
                        else {
                            reject('Error At Creating Book');
                        }
                    }
                    xr.send(JSON.stringify(dataBody));
                }).then( (para) => {
                    console.log(para);
                    alert(`Book ${dataBody.name} created Successfully!`);
                })
            }).catch( (para) => {
                console.log(para);
            });
            bookName.value = bookAuthor.value = bookCategory.value = bookPrice.value = bookQuantity.value = bookid.value = '';
        }
        generatingBookId(dataBody);
    }
});