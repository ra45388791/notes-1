//引入http模組
const http = require('http');       //開啟伺服器功能
const express = require('express'); //路由
const fs = require('fs');           //用於讀取資料夾的文件
const parseFormdata = require('parse-formdata');  //解析formdata表單
const mysql = require('mysql');
const { log } = require('console');

// const URL = require('url');         //用來解析url
// const qs = require('querystring');   //可以用來拆分字符串


let app = express();
/*  mysql
let mysql1 = mysql.createConnection({
    host: 'kfgk8u2ogtoylkq9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'utzu8g2mwnfqg99c',
    password: 'i0omitfkgk0n0j1w',
    port: 3306,
    database: 'h0u9p9ajh269wj91'
});
*/

const port = process.env.PORT || 5000;                      //伺服器會自動分配鎖以上傳時不需要設置



//cors設定
function corsSet(type) {
    if (type === undefined) {
        return {
            'Content-type': 'text/plain; charser=utf-8',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*'
        }
    } else {
        return {
            'Content-type': `text/${type}; charser=utf-8`,      //預設格式
            'Access-Control-Allow-Credentials': true,           //使用cookie
            'Access-Control-Allow-Origin': '*'                  //cors 全開
        }
    }
}

//讀取資料夾中的文件 ( 文件名稱 狀態碼 回傳參數 )
function sendResponse(page, filename, statusCode, res) {
    //參數1 文件名 ,狀態碼 ,res
    fs.readFile(`./${page}/${filename}`, (err, data) => {
        //參數 如果成功讀取文件 err會是 undefine data會被賦予文件內容
        //如果讀取時系統報錯err會被賦予錯誤訊息
        if (err) {
            res.writeHead(500, corsSet());                  //corsSet() 無參數 type 為預設
            res.end('抱歉 文件錯誤!');                      //回傳錯誤訊息
        } else {
            res.writeHead(statusCode, corsSet('html'));
            res.end(data);                                  //回傳取得的文件
        }
    })
}

//設定server網址 因為是本地端測試所以用127.0.0.1
// const hostname = '127.0.0.1';        //上傳到伺服器要拿掉
//PORT號 不要跟現有埠號重複就好

const server = http.createServer((req, res) => {
    // res.writeHead(200, cors);                    //回應200 ok cors設定全開

    const method = req.method;                      // 取得看是 GET 還是 POST 請求
    let url = req.url;                              //會取得 /?lang=zh 樣子的字串
    const reqUrl = new URL(url, req.headers.origin);//!動態取得發送請求方的網址 網址參數, 網址基本名稱
    // const reqUrl = new URL(url, 'http://localhost:5000/');//!動態取得發送請求方的網址 網址參數, 網址基本名稱



    if (method === 'GET') {
        let pageNumber = reqUrl.searchParams.get('pagenumber');

        if (pageNumber === '2') {
            url = reqUrl.pathname;                      //重設 url 等於 reqUrl 中的pathname 
            const lang = reqUrl.searchParams.get('lang');
            let selector;

            //判斷請求參數中的lang 是否為zh 或其他來決定語言
            if (lang === null || lang === 'en') {
                selector = '';                          //如果 lang參數等於 null 或英文 則為預設
            } else if (lang === 'zh') {
                selector = '-zh';                       //如果為 zh 將 selector 設為-zh
            } else {
                selector = '';                          //如果都不是 則為預設
            }

            //判斷請求哪個網頁
            if (url === '/') {
                //呼叫sendResponse函數 指定讀取 ( index.html 檔案; 狀態碼200; 回傳資料給res;)
                sendResponse('html', `index${selector}.html`, 200, res);
            } else if (url === '/html/about.html') {
                sendResponse('html', `about${selector}.html`, 200, res);
            } else {
                sendResponse('html', `404${selector}.html`, 404, res);
            }

        }
        /* 
        else if (pageNumber === '4') {
            //!寫到這裡(頭)
            res.writeHead(200, corsSet());

            let sqlDataBuffer = new Promise((resolve, reject) => {
                let mysqldata = [];
                // sql
                mysql1.connect();
                mysql1.query('select * from `database`', function (err, rows, fields) {
                    if (err) throw err;

                    rows.forEach(function (e) {
                        let a = {
                            id: e.data_id,
                            name: e.data_name
                        }
                        mysqldata.push(a);
                    });
                    resolve(mysqldata);
                });

                // mysql1.end();
            });

            sqlDataBuffer
                .then((value) => {
                    console.log(value);         //輸出 [ { id: 1, name: '員工1號' }, { id: 2, name: '員工2號' } ]


                    //!寫到這裡 傳過來的資料似乎是buffer型態

                    // res.end(value);
                })
                .catch((err) => {
                    console.log(err);
                });
            //!寫到這裡(尾)
        */







    } else if (method === 'POST') {
        //取得vue頁面參數
        let pageNumber = reqUrl.searchParams.get('pagenumber');
        // console.log('測試:' + pageNumber);
        if (pageNumber === '3' && pageNumber !== null) {
            new Promise((res, rej) => {
                parseFormdata(req, function (err, data) {
                    if (err) {
                        rej(Error(res));
                    } else {
                        res(data.fields);                   //回傳表單中的參數
                    }
                });
            })
                .then(value => {
                    if (value.username === "johncena" && value.password === "johncena123") {
                        // res.statusCode = 301;
                        // res.setHeader("Location", "/login-success.html");
                        sendResponse('loginPage', `login-success.html`, 200, res);
                    } else {
                        // res.statusCode = 301;
                        // res.setHeader("Location", "/login-fail.html");
                        sendResponse('loginPage', `login-fall.html`, 200, res);
                    }

                    // res.end();                  //回傳至前端 結束事件
                })
                .catch(err => {
                    console.log(err);
                });
        } else if (pageNumber === '4' && pageNumber !== null) {

            //暫無 預計call mysql資料

        }



        /***************************************************************
            個人github網頁登入實做
        ****************************************************************/
        let gitHubData = reqUrl.searchParams.get('gitUser')

        if (gitHubData !== null && gitHubData === 'orange') {
            new Promise((res, rej) => {
                //解析表單
                parseFormdata(req, function (err, data) {
                    if (err) {
                        rej(Error(res));
                    } else {
                        res(data.fields);                   //回傳表單中的參數
                    }
                });
            })
                .then(value => {

                    if (value.username === "johncena" && value.password === "johncena123") {

                        res.writeHead(301, {
                            'Content-type': `text/plain; charser=utf-8`,      //預設格式
                            'Access-Control-Allow-Credentials': true,           //使用cookie
                            'Access-Control-Allow-Origin': '*',                  //cors 全開
                            "Location": "https://ra45388791.github.io/myResume/index.html",
                        });

                        res.end();
                    } else {
                        sendResponse('loginPage', `login-fall.html`, 200, res);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }












})


//express 模塊 快速監聽寫法
app.get('/', (req, res) => {
    res.send('hello');
});
//監聽 port 3000的主頁 get請求
app.listen(3000);


server.listen(port, () => {
    // console.log(`伺服器運作於 http://${hostname}:${port}`);
    console.log(`/// 成功啟動伺服器 /// 伺服器運作於 port:${port} ///`);
    // console.log(http);
    // console.log(url);
    // console.log(express);
    // console.log(app1);

})

