
// function text(a, b) {

//     const length = a.length > b.length ? a.length - b.length : b.length - a.length;
//     let aa = a.split('').reverse();
//     let bb = b.split('').reverse();

//     let cc = [];
//     for (let i = 0; i <= length; i++) {
//         if (aa[i] && bb[i]) {
//             cc.push(parseInt(aa[i]) + parseInt(bb[i]))

//         }
//         else if (aa[i]) {
//             cc.push(parseInt(aa[i]))

//         }
//         else {
//             cc.push(parseInt(bb[i]))

//         }
//     }
//     console.log(aa);
//     console.log(bb);
//     console.log(cc);

//     for (let i = 0; i < cc.length; i++) {
//         if (cc[i] === 2) {
//             cc[i] = 1;
//             if (cc[i + 1]) cc[i + 1] += 1;
//             else cc[i + 1] = 1;
//         }
//     }

//     const ff = cc.reverse();




//     return ff;
// };


// console.log(text("11", "1"));


function aaa() {
    let a = {
        value: 0
    };
    function bbb() {
        return this.value++;
    }
    return bbb.call(a);
}


if (aaa() === 0 && aaa() === 1 && aaa() === 2) {
    console.log('成功');
}


console.log(aaa());
console.log(aaa());
console.log(aaa());