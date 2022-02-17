//引入自訂模塊
const calculator = require('./calculator');
console.log(calculator);

let addResult = calculator.add(1, 2);
console.log(`1+2=${addResult}`);

let suntractResult = calculator.suntract(5, 2);
console.log(`5-2=${suntractResult}`);

let multiplicationResult = calculator.multiplication(5, 5);
console.log(`5*5=${multiplicationResult}`);

let divisionResult = calculator.division(20, 4);
console.log(`20/4=${divisionResult}`);