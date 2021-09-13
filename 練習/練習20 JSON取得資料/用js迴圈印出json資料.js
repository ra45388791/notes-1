const buttonGet = document.getElementById('buttonGet');
const buttonClear = document.getElementById('buttonClear');

let jsonContent = document.getElementById('jsonContent');


//監視器
buttonGet.addEventListener('click', printOutJSON);
buttonClear.addEventListener('click', clearJSON);


function printOutJSON() {
    const resourceUrl = 'https://jsonplaceholder.typicode.com/posts';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', resourceUrl, true);
    xhr.responseType = 'json';

    //如果xhr回應狀態 等於4 狀態碼 200 執行 伺服器回應狀態時 處理資料。
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            xhr.onload = function () {

                let xhrContent = xhr.response;  //取得資料

                xhrContent.forEach((e) => {
                    let mydiv = document.createElement('div');
                    let myP1 = document.createElement('p');
                    let myP2 = document.createElement('p');
                    let myP3 = document.createElement('p');
                    let myP4 = document.createElement('p');

                    myP1.textContent = `使用者ID : ${e.userId}`
                    myP2.textContent = `發文次數 : ${e.id}`
                    myP3.textContent = `標題 : ${e.title}`
                    myP4.textContent = `內文 : ${e.body}`

                    mydiv.append(myP1);
                    mydiv.append(myP2);
                    mydiv.append(myP3);
                    mydiv.append(myP4);

                    jsonContent.append(mydiv);
                });
            }

        }
    }
    xhr.send();


}

function clearJSON(eventJSON) {
    jsonContent.innerHTML = '';
}


