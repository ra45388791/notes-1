
//★原型
function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
}
//定義 性別 興趣介紹
Person.prototype.bio = function () {
    let pronoun;
    let string;

    //檢查男女性
    if (this.gender === 'male') {
        pronoun = 'he likes '
    } else if (this.gender === 'female') {
        pronoun = 'she likes ';
    } else {
        pronoun = 'They likes '
    }
    //興趣
    if (this.interests.length === 1) {
        string = this.interests + '.';
    } else if (this.interests.length === 2) {
        string = this.interests[0] + ' and ' + this.interests[1] + '.';
    } else {
        for (let i = 0; i < this.interests.length; i++) {
            if (i === 0) {
                string = this.interests[i];
            } else if (i === 1) {
                string += ' and ' + this.interests[i] + ' , ';

            } else if (i === this.interests.length - 1) {
                string += this.interests[i] + '.'
            } else {
                string += this.interests[i] + ' , '
            }
        }
    }

    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ' + pronoun + string);
};

//定義招呼
Person.prototype.greeting = function () {
    alert('Hi! I\'m ' + this.name.first + '.');
};

//將新函式添增到建構子的原型
Person.prototype.farewell = function () {
    alert(this.name.first + ' has left the building. Bye for now!');
}


//★學生
function Student(first, last, age, gender, interests, number) {
    //繼承Person 屬性
    Person.call(this, first, last, age, gender, interests);

    //新屬性
    this.number = number;
}
//繼承Person 方法  (此步驟會把原型函數改為指向 Person)
Student.prototype = Object.create(Person.prototype);

//把構造函數指向 從 Person 指回本體 Student
Student.prototype.constructor = Student;

Student.prototype.greeting = function () {
    alert('Yo! I\'m ' + this.name.first + '.');
};


//★老師
//建立繼承 Person 的 Teacher 建構子原型
function Teacher(first, last, age, gender, interests, subject) {
    //繼承 Person 的屬性值
    Person.call(this, first, last, age, gender, interests);
    //新屬性
    this.subject = subject;
}
//★繼承 Person 的 prototype 方法  ((( 注意 用這方法會把 constructor 指向Person)))
Teacher.prototype = Object.create(Person.prototype);
//★★★★★重要★★★★★
//因為使用了 Teacher.prototype = Object.create(Person.prototype); 這句
//目前 Teacher.prototype 是指向person 這樣會有問題
//所以要加入這行 把 指向person 的 Teacher 指回來
Teacher.prototype.constructor = Teacher;
//★★★★★重要★★★★★

//新增老師的問候函式
Teacher.prototype.greeting = function () {
    var prefix;

    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
        prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
        prefix = 'Mrs.';
    } else {
        prefix = 'Mx.';
    }
    alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};








//★人們實例化
// person1 依照 Person 建立建構子 括號()中是傳入參數
let person1 = new Person('Bob', 'Smith', 32, 'female', ['聽音樂', '跳舞', '唱歌', '打電動']);

//person2 根據現有的person1 物件建立 會有與person1相同的屬性/函數。
let person2 = Object.create(person1);
//會回傳person1 的建構子
// console.log(person2.__proto__);

//使用 person1 的建構子建立新的實例 並傳入參數
let person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing'])
// console.log(person3);


//★學生實例化
let student1 = new Student('Liz', 'Sheppard', 17, 'female', ['ninjitsu', 'air cadets'], 12);


//★老師實例化
let teacher1 = new Teacher('Duo', 'fama', 35, 'male', ['打電動', '旅遊', '吃美食'], '科學')

console.log(Object.keys(person1));





//把資料推入陣列並透過 forEach 查詢指定物件
let testArray = [];

testArray.push(person3);
testArray.push(student1);
testArray.push(teacher1);
console.log(testArray);

testArray.forEach((e,index) => {
    if (e.name.first === 'Karen') {
        console.log('成功找到 ' + e.name.first);
        console.log(index);
    }
});

//把資料推入陣列並透過 forEach 查詢指定物件 結束









//嚴格模式
function fff() {
    'use strict';
    return this;

}
//沒有嚴格模式
function fff2() {
    return this;
}