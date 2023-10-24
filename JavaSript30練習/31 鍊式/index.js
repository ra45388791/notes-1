class Chain {
    constructor(ele) {
        this.ele = ele;
        this.next = null;
    }

}
class ChainList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

}
//新增
ChainList.prototype.addend = function (ele) {
    let newChain = new Chain(ele)
    //1.是不是從0開始創建鍊式
    if (this.head === null) {
        this.head = newChain
    } else {
        //2.不是則加到最後一個
        let current = this.head
        while (current.next !== null) {
            current = current.next
        }
        current.next = newChain

    }
    this.length++;
    return newChain;
}
//新增至指定位置
ChainList.prototype.insert = function (position, ele) {
    //非索引範圍內
    if (position < 0 && position > this.length) return false;

    let newChain = new Chain(ele);
    let current = this.head

    if (position === 0) {
        newChain.next = current;
        this.head = newChain;
    } else {
        //1.從 0 開始查詢
        //2. pervasive = 上一個node; current = 下一個node
        let pervasive = this.head
        let index = 0;
        while (index !== position) {
            index++;
            pervasive = current;
            current = current.next;
        }
        newChain.next = current
        pervasive.next = newChain;
    }
    this.length++;
    return newChain;;
}
//刪除指定位置chain
ChainList.prototype.removeAt = function (position) {
    if (position < 0 && position > this.length) return false;
    let current = this.head;
    if (position === 0) {
        this.head = current.next
    } else {
        let index = 0
        let pervasive = this.head
        while (position !== index) {
            index++;
            pervasive = current
            current = current.next
        }
        // 3.next = 4.next;  將3的 "next" 指定成 4.next 讓4的指標斷掉
        // 原: 3.next => 4.next => 5.next
        // 改: 3.next      =>      5.next
        pervasive.next = current.next;
    }

    this.length--;
    return current.ele
}

//刪除和傳入 chain 一模一樣的 chain
ChainList.prototype.remove = function (ele) {
    let index = this.indexOf(ele);
    this.removeAt(index);
}

ChainList.prototype.indexOf = function (ele) {
    let index = -1;
    let current = this.head;
    while (current) {
        index++;
        if (current.ele == ele.ele) {
            return index;
        }
        current = current.next;
    }

    if (index !== -1) {
        return -1;
    } else {
        return index;
    }

}

ChainList.prototype.toString = function () {
    let current = this.head;
    let string = "";
    while (current) {
        string += current.ele;
        current = current.next;
    }
    return string;
}

ChainList.prototype.size = function () {
    return this.length;
}

let chainTest = new ChainList()
chainTest.addend('test1');
chainTest.addend('測試2');
chainTest.addend('test3');
let test1 = chainTest.addend('測試4');
chainTest.addend('test5');
chainTest.addend('測試6');
chainTest.addend('test7');

// chainTest.remove(chainTest.head.next.next.next);

//刪除第四位
// chainTest.remove(test1);
// console.log(chainTest.indexOf(test1));
console.log(chainTest.toString())


let chainChile = chainTest.head;
for (let i = 0; i < chainTest.length; i++) {

    console.log(chainChile);
    chainChile = chainChile.next
}

// const maps = new Map();
// maps.set('key1', 'value1');
// maps.set('key2', 'value2');
// maps.set('key3', 'value3');
// maps.set('key4', 'value4')

// console.log(maps.entries())
// console.log(maps.get('key3'));