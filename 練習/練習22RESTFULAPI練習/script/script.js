function ajaxGetJson(func, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(func, url);
        xhr.onreadystatechange = () => {
            console.log(xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let jsonData = JSON.parse(xhr.response);
                    resolve(jsonData);
                } else {
                    reject(new Error(xhr));
                }
            }
        }
        //!記得發送請求
        xhr.send();
    })
}

let url = 'http://localhost:3000/data/';

ajaxGetJson('GET', url)
    .then((xhrJson) => {
        console.log(xhrJson);
        let contant = document.querySelector('#contant');
        contant.innerHTML = '';
        xhrJson.forEach(event => {
            let p = document.createElement('p');
            p.innerHTML = event.id + ' ' + event.name;
            contant.append(p);
        });
    })
    .catch((err) => {
        console.log(err);
    })



//推資料上json
let addbutton = document.querySelector('#addData');
addbutton.addEventListener('click', () => {
    const nameValue = document.querySelector('#addContant').value.trim();
    console.log(nameValue);
    if (!nameValue) return false;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(xhr);
    xhr.send('name=' + nameValue);
})

//刪除指定資料
let clearbutton = document.querySelector('#clearData');
clearbutton.addEventListener('click', () => {
    const clearValue = document.querySelector('#clearContant').value.trim();
    if (!clearValue) return false;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + clearValue);
    xhr.send();
})

//修改指定資料
let updatebutton = document.querySelector('#updateData');
updatebutton.addEventListener('click', () => {
    const id = document.querySelector('#update input[name=id]').value.trim();
    if (!id) return false;
    const name = document.querySelector('#update input[name=name]').value.trim();
    if (!name) return false;
    
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url + id);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('name=' + name);
})






