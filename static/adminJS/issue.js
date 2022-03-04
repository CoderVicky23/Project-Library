document.querySelector('.close').addEventListener('click', function(e){
    console.log(e.target);
    this.parentElement.style.display = 'none';
})
document.getElementById('userSearch').addEventListener('click', function() {
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
                        // console.log(typeof(xhr.response));
                    }
                    else {
                        console.log('Error Occured');
                    }
                }
                xhr.send(JSON.stringify(data));
            }).then( (para) => {
                let userInfo = document.getElementById('userInfo');
                let text = '';
                text += `<div class="userName">${para.name}</div>
                            <div class="userRollno">${para.rollno}</div>`;
                userInfo.innerHTML = text;
            })
        }
        gettingUsers('post', '/userCredentials', [userEnteredId.value]);
    }
})