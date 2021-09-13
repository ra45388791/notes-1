// onmessage = function () {
//     let myDate;
//     for (let i = 0; i < 10000000; i++) {
//         let date = new Date();
//         myDate = date
//     }

//     postMessage(myDate);
// }

// importScripts('異步async.js');

// console.log(sss.name);

//接受傳入的資料 後以postMessage( ) 回傳
onmessage = function (event) {

    // 檢查是否是指定頁面發送請求。
    // if (event.origin !== 'http://localhost:5500/'){
    //     return;
    // }
    //  建立溝通
    // event.source.postMessage('已建立溝通。', event.origin);

    let myDate = event;

    //回傳的資料包裝在 data屬性中 要這樣寫
    postMessage(myDate.data);
    // console.log(myDate.data.name);
}