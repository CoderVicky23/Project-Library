document.getElementById('userAdd').addEventListener('click', function() {
    let userName = document.getElementById('userInputName');
    let userNamePop = document.querySelector('.addMemberUserFieldEmptyPop');
    if (userName.value == ''){
        userNamePop.style.display = 'block';
        setTimeout( () => {
            userNamePop.style.display = 'none';
        }, 3000);
    }
    // else if (userName.value == a number )
    else {
        let dataBody = { name : userName.value };
        let prom = new Promise( (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/addNewUser');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'json';
            xhr.onload = function() {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                }
                else {
                    reject('Error Occured');
                }
            }
            xhr.send(JSON.stringify(dataBody));
        })
        prom.then( (para) => {
            console.log(para);
            alert(`${para.name} registered with Roll No ${para.rollno}`);
            userName.value = '';
        }).catch( (para) => {
            console.log(para);
        })
    }
})