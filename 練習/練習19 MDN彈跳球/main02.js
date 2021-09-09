const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');        //定義 ctx 為畫布物件
const fraction = document.querySelector('p');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let animeId;//動畫id
let balls = [];//放球的箱子






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

function Shape() {
    this.x = random(20, width - 20);
    this.y = random(20, height - 20);
    this.velX = random(-7, 7);
    this.velY = random(-7, 7);

    this.exists = true; //追蹤球體是否被吃掉 預設為true。
}



function Ball() {
    Shape.call(this);
    this.color = `rgb(${random(0, 255)} , ${random(0, 255)} ,${random(0, 255)})`;
    this.size = random(10, 20);
}
Ball.prototype = Object.create(Shape.prototype);    //繼承 prototype
Ball.prototype.constructor = Ball;                //建構函數 指回自身





Shape.prototype.draw = function () {
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
Shape.prototype.update = function () {
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
//變色判斷
Shape.prototype.collisionDetect = function () {
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





function EvilCircle() {
    Shape.call(this);
    this.color = 'white';
    this.size = 10;
    this.velX = 20;
    this.velY = 20;
}
EvilCircle.prototype = Object.create(Shape.prototype);  //繼承
EvilCircle.prototype.constructor = EvilCircle;          //構造函數指向

EvilCircle.prototype.draw = function () {
    //繪製圓圈
    ctx.beginPath();                                    //宣告開始動作 創立新路徑。
    ctx.strokeStyle = this.color;                       //顏色
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //圓形
    ctx.lineWidth = 3;                                  //粗度
    ctx.stroke();                                       //繪製
}

EvilCircle.prototype.checkBounds = function () {
    //與 Shape 的 update 相似。
    //如果惡魔圈超出範圍 把他抓回來。
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }
    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }
    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }
    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
}

EvilCircle.prototype.setControlsd = function () {
    //當鍵盤按下時。
    window.onkeydown = e => {
        if (balls.length !== 0) {
            switch (e.key) {
                case 'a':
                    this.x -= this.velX;
                    break;
                case 'd':
                    this.x += this.velX;
                    break;
                case 'w':
                    this.y -= this.velY;
                    break;
                case 's':
                    this.y += this.velY;
                    break;
                case 'a', 'w':
                    this.x -= this.velX;
                    this.y -= this.velY;
                    break;
                case 'w', 'd':
                    this.y -= this.velY;
                    this.x += this.velX;
                    break;
                case 'd', 's':
                    this.x += this.velX;
                    this.y += this.velY;
                    break;
                case 's', 'a':
                    this.y += this.velY;
                    this.x -= this.velX;
                    break;
            }
        }
    }
}

EvilCircle.prototype.collisionDetect = function () {
    for (j = 0; j < balls.length; j++) {
        if (this.exists) {
            var dx = this.x - balls[j].x;                   //與目標的x軸距離
            var dy = this.y - balls[j].y;                   //與目標的y軸距離
            var distance = Math.sqrt(dx * dx + dy * dy);    //與目標之間的距離

            // 繪製與目標間的框線
            // ctx.beginPath();
            // ctx.strokeStyle = 'while';
            // ctx.strokeRect(this.x,this.y,-dx,-dy);            

            //印出 與目標間的距離 X軸距離 Y軸距離
            // console.log(distance);
            // console.log(dx);
            // console.log(dy);

            //如果與目標間的距離 小於 自身大小+目標大小
            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                balls.splice(j, 1);
                //更新球數
                count = balls.length;
                fraction.textContent = `還剩下 ${count} 顆球`;

                // balls[j].color = this.colora= 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}





//實例化邪惡球球
let evilCircle = new EvilCircle();
evilCircle.setControlsd();      //移動
//製作球
while (balls.length < 5) {
    let ball = new Ball();
    balls.push(ball);
}
//宣告球數字樣
let count = balls.length;
fraction.textContent = `還剩下 ${count} 顆球`;





//球體動畫
function loop() {
    //設定 canvas 填滿半透明的黑色。
    //接著透過 fillRect() 設定要填滿的範圍 ( 開始填充的位置 x軸, y 軸, 要填充的寬度 wifth, height) 全部填滿
    //★ 透過這個方式覆蓋掉先前存在的一個影格，否則 之前的影格會持續存在，球看起來會像是一條蛇。
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; //a 值設 0.25可讓前一個影格微微發亮，會有尾巴的效果。 設1則完全消除
    ctx.fillRect(0, 0, width, height);

    //邪惡圈
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    //球
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();                //畫出下一格動畫
        balls[i].update();              //判斷是否碰到邊界和更新位置
        balls[i].collisionDetect();     //檢查是否碰到 碰到時更換顏色
    }

    //執行動畫
    animeId = requestAnimationFrame(loop);
    // console.log(requestAnimationFrame);

    //結束動畫
    if (balls.length === 0) {
        fraction.textContent = '遊戲結束';

        setTimeout(() => {
            window.cancelAnimationFrame(animeId);
        }, 1000);
    }
}
loop();     //執行loop





