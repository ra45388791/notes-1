//引入http模組
const http = require('http');


//設定server網址 因為是本地端測試所以用127.0.0.1
const hostname = '127.0.0.1';
//port號 不要跟現有埠號重複就好
const port = 3000;

//新增一個server並指定他的頁面資訊 內容為hello world!
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.header('Access-Control-Allow-Origin', '*');
    res.end('Hello World\n');
})

server.listen(port, hostname, () => {
    console.log(`伺服器運作於 http://${hostname}:${port}`);
    console.log(http);
    // console.log(http.rawHeaders);
})

