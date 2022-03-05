function getBooks (method, url) {
    return new Promise ( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method , url);
        xhr.onload = function(){
            if (xhr.status == 200) {
                resolve(xhr.response);
            }
            else {
                reject('Error');
            }
        }
        xhr.send();
    })
}

getBooks('get', '/getAllBooks').then( (para) => {
    let data = JSON.parse(para);
    let block = document.querySelector('.books');
    let text = `<table class="bookHeading">
                    <tr>
                        <th class="bookName">
                            Name of The Book
                        </th>
                        <th class="bookAuthor">
                            Author
                        </th>
                        <th class="bookAvailability">
                            Availability
                        </th>
                    </tr>`;
    for (i = 0 ; i < Object.keys(data).length ; i++){
        text += `<tr class="bookField"><td class="perBook BookName">${data[i]['name']}</td>
                        <td class="perBook BookAuthor"> ${data[i]['author']} </td>
                        <td class="perBook"> NA </td>
                </tr>`;
    }
    text += '</table>';
    block.innerHTML = text;
})

document.getElementById('sign-in-btn').addEventListener('click', function(){
    let adminId = document.getElementById('exampleInputEmail1');
    let adminPwd = document.getElementById('exampleInputPassword1');
    let credentials = { adminId : adminId.value , password : adminPwd.value};

    function callBack(method , url, credentials) {
        return new Promise( (resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type' , 'application/json');
            xhr.responseType = 'json';
            xhr.onload = function() {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                }
                else {
                    reject("Error Occured");
                }
            }
            console.log(credentials);
            xhr.send(JSON.stringify(credentials));
        })
    }

    callBack('post', '/adminVerification' , credentials).then( (para) => {
        adminId.value = '';
        adminPwd.value = '';
        window.location.href = para['nextUrl'];
    }).catch( (para) => {
        console.log(para);
    })
})

let input = document.querySelector('#SearchBox');
input.addEventListener('keyup', function() {
    let items = document.querySelectorAll('.bookField');
    for (var i=0 ; i<items.length ; i++) {
        let bookField1 = items[i].children;
        if (bookField1[0].textContent.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ) {
            items[i].style.display = '';
        }
        else if ( bookField1[1].textContent.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ) {
            items[i].style.display = '';
        }
        else {
            items[i].style.display = 'none';
        }
    }
})

document.getElementById('sortByBookName').addEventListener('click', function() {
    let items = document.querySelectorAll('.BookName');
    console.log(items);   // object [ <div class="abc">Using C++]
    let textItems = [];
    for (i=0 ; i<items.length ; i++){
        textItems.push(items[i].textContent);
    }
    textItems.sort();
    console.log(textItems);
})