


function sss(s) {


    if (s.length % 2 === 1) return false;
    let total = []

    s.split('').forEach(function (e) {
        if (total.length === 0) total.push(e);

        if (e === '(') total.push(')')
        else if (e === '[') total.push(']')
        else if (e === '{') total.push('}')
        else if (e.length === 0 || e !== total.pop()) return false;
        else total.pop();
    })

    if (total.length > 0) return false;
    else return true;

}

const s = "({{{{}}}))"

// console.log(sss(s));



for (let i = 0; i < 10; i++) {
    let s = [];
    for (let j = 0; j < i; j++) {
        s.push('*');
    }
    console.log(s.join(''))

}
for (let i = 10; i > 0; i--) {
    let s = [];
    for (let j = 0; j < i; j++) {
        s.push('*');
    }
    console.log(s.join(''))

}