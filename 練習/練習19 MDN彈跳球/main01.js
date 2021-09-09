// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');        //定義 ctx 為畫布物件

// console.log(ctx);

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成隨機數的函數
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;

    //檢查 回傳數字不能等於0
    if (num === 0) {
        while (num === 0) {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return num;
    }
    return num;

}

function Ball() {
    //x 和 y 座標 每顆彩球都會先有位於畫面中的隨機水平 / 垂直座標。
    //範圍從 0 (最左上角) 到瀏覽器可視區的寬＼高度 (最右下角) 為止。
    this.x = random(20, width - 20);      // 取0 到 寬度 之間的值 
    this.y = random(20, height - 20);     // 位置要往內縮20px 否則生成時碰到邊界 球體會無法移動
    //水平與垂直速度 (velX 與 velY) — 每顆彩球均具備隨機的速度值；
    //在我們開始彩球動畫時，這些數值就會加上 x/y 座標值，以利在各畫格(frame)中移動彩球。
    this.velX = random(-7, 7);      //速度值 取 -7 ~ 7之間 
    this.velY = random(-7, 7);      //同上

    // console.log(`velX : 。${this.velX} ;  velY : ${this.velY}`);

    //color — 彩球的顏色是隨機產生。
    this.color = `rgb(${random(0, 255)} , ${random(0, 255)} ,${random(0, 255)})`;
    //各彩球大小亦為隨機，從 10 到 20 像素不等。
    this.size = random(10, 20);
}



Ball.prototype.draw = function () {
    //對著 ctx(也就是畫布) 聲明 beginPath() 聲明我們要在紙上畫出來的形狀。
    ctx.beginPath();
    //接著用 fillStyle 定義該形狀所要呈現的顏色 — 設定為球體的 color 屬性。
    ctx.fillStyle = this.color;
    /**再用 arc() 函式在紙上勾勒出弧形。相關參數為：
     *      。弧形中心的 x 與 y 位置 — 我們指定球體的 x 與 y 屬性。
     *      。弧形半徑 — 指定球體的 size 屬性。
     *      。最後 2 項參數則指定弧形繪製時的圓圈起、終點角度。我們這裡指定 0 度與 2 * PI 度，這也等於半徑繞了 360 度 (你必須在半徑中指定，有點煩)。
     *         (如此構成完整的圓。如果你只設定了 1 * PI，就會只有半球體 (即 180 度)。)
     */
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //最後使用 fill() 函式，基本上是用來聲稱「完成我們以 beginPath() 開始的繪圖路徑，再用 fillStyle 中指定的色彩將之填滿」。
    ctx.fill();
}

//判斷是否碰到邊界
Ball.prototype.update = function () {
    //如果球的 x 座標 加上球的大 大於等於寬度
    //就把球的 X軸移動數值反向設定
    // ★ x/y是球體的中心，他們只有1px 的大小。
    // ★ 如果不加上球的體積，球就會超出窗外，直到撞到x 的 1px 才反彈。
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;                //透過在當下的位置 +上額外的偏移數值達到移動的效果
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
    for (j = 0; j < balls.length; j++) {
        if ((!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY))) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

let balls = [];
//球體動畫
function loop() {
    //設定 canvas 填滿半透明的黑色。
    //接著透過 fillRect() 設定要填滿的範圍 ( 開始填充的位置 x軸, y 軸, 要填充的寬度 wifth, height) 全部填滿
    //★ 透過這個方式覆蓋掉先前存在的一個影格，否則 之前的影格會持續存在，球看起來會像是一條蛇。
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; //a 值設 0.25可讓前一個影格微微發亮，會有尾巴的效果。 設1則完全消除
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        let ball = new Ball();
        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();                //畫出下一格動畫
        balls[i].update();              //判斷是否碰到邊界和更新位置
        balls[i].collisionDetect();     //檢查是否碰到 碰到時更換顏色
    }

    sss = requestAnimationFrame(loop);
    // console.log(requestAnimationFrame);

}
loop();     //執行loop





// function Shape() {
//     this.x = random(20, width - 20);
//     this.y = random(20, height - 20);
//     this.velX = random(-7, 7);
//     this.velY = random(-7, 7);
    
//     this.exists = true; //追蹤球體是否被吃掉 預設為true。
// }
// Shape.prototype = Object.create(Ball.prototype);    //繼承 prototype
// Shape.prototype.constructor = Shape;                //建構函數 指回自身

// let shapes = new Shape;

// balls.forEach(function (e) {
//     e.shapeX = shapes.x;
//     e.shapeY = shapes.y;
//     e.shapevelX = shapes.velX;
//     e.shapevelY = shapes.velY;

// })






