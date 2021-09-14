//測試 async異步api worker
const btn = document.querySelector('button');
const asyncContent = document.getElementById('asyncContent');
//實例worker
const worker = new Worker('異步/worker.js');

let sss = {
    name: 'abd',
    age: 15
};

btn.addEventListener('click', () => {
    worker.postMessage(sss);

    let pElem = document.createElement('p');
    pElem.textContent = 'This is a newly-added paragraph.';
    asyncContent.appendChild(pElem);
});

//接收 worker 回傳資料
worker.onmessage = function (e) {
    console.log(e.data.age);
}

console.log(document.cookie);
