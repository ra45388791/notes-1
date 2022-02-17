function add(num1, num2) {
    return num1 + num2;
}

function suntract(num1, num2) {
    return num1 - num2;
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    return num1 / num2;
}

//輸出讓其他程式可以引入此模塊的方法



//寫法4 (如果寫法三的屬性名 與方法名一樣可以這樣寫)
module.exports = {
    add,
    suntract,
    multiplication,
    division
}