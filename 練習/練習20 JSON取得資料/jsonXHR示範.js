const header = document.querySelector('header');
const section = document.querySelector('section');

//把資料源頭存成物件
const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'
//實例化XHR原型
let request = new XMLHttpRequest();
//開啟呼叫函式
request.open('GET', requestURL);
//指定回傳的資料格式 json
request.responseType = 'json';

request.onreadystatechange = () => {
    console.log('狀態 : ' + request.readyState);

    console.log('狀態碼 : ' + request.status);
}

//送出請求
request.send();

//等待json伺服器端回應
request.onload = function () {
    //取得伺服器回傳的資料  response屬性
    let superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);

    console.log(request.response);
}



//渲染json內文 標題
function populateHeader(jsonObj) {
    let myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];    //等於 json 中的 squadName屬性值
    header.appendChild(myH1);

    let myPara = document.createElement('p');
    myPara.textContent = 'Hometown' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}

//渲染json資料 內文
function showHeroes(jsonObj) {
    let heroes = jsonObj['members'];    //取得json 中的 members 陣列

    heroes.forEach(e => {
        let myArticle = document.createElement('article');
        let myH2 = document.createElement('h2');
        let myPara1 = document.createElement('p');
        let myPara2 = document.createElement('p');
        let myPara3 = document.createElement('p');
        let myList = document.createElement('ul');

        myH2.textContent = e.name;
        myPara1.textContent = 'Secret identity: ' + e.secretIdentity;
        myPara2.textContent = 'Age:' + e.age;
        myPara3.textContent = 'Superpowers: ';

        let superPowers = e.powers;
        superPowers.forEach(event => {
            let listItem = document.createElement('li');
            listItem.textContent = event;
            myList.appendChild(listItem);
        });

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    });
}



let boo = true;

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (boo === true) {
            resolve('成功');
        } else {
            reject('失敗');
        }
    }, 1000)

});
promise
    .then(e => {
        console.log('回傳成功');
        return e
    })
    .catch(err => {
        console.log(err);
    })











