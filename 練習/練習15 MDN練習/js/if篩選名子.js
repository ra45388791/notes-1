
// var admitted = document.querySelector('.admitted');
// var refused = document.querySelector('.refused');
let admitted = 'Admit: ';
let refused = 'Refuse: '

var people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

let i = 0, d = 0;

people.forEach(item =>  {

    if (item === 'Phil' || item === 'Lola') {
        if (i != 0) {
            refused += ' , ' + item;

        } else {
            refused += item;
            i++;
        }


    } else {
        if (d != 0) {
            admitted += ' , ' + item;
        } else { 
            admitted += item;
            d++;
        }


    }




})


console.log(admitted);
console.log(refused);


