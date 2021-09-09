const playMe = document.querySelector('.playMe');
const playMeText = document.querySelector('.playMeText')
const preview = document.querySelector('.preview');


let browserType = 'Mozilla';


// let cities = ['lonDon', 'ManCHESTer', 'BiRmiNGHAM', 'liVERpoOL'];

/*
//演算取得陣列資料中的某段資料
let stations = ['MAN675847583748sjt567654;Manchester Piccadilly',
    'GNF576746573fhdg4737dh4;Greenfield',
    'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
    'SYB4f65hf75f736463;Stalybridge',
    'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'];
*/

//MDN陣列練習
let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
let random = ['tree', 795, [0, 1, 2, 3]];

for (let i = 0; i < random.length; i++) {
    randomData = typeof random[i];

    if (randomData === 'string') {
        console.log('字串');
    } else if (randomData === 'number') {
        console.log('數字');
    } else if (randomData === 'object') {
        console.log('物件');
    }


}




function delayExcution() {

    //持續渲染字串
    /*
    let i = 0, b = 0;
    newDelay = setInterval(function () {

        playMeText.textContent += browserType[i];
        i++;
        b++;
        console.log('執行次數:' + b);
        if (i === browserType.length) {
            i = 0;
            playMeText.textContent += ' ';
        }
        if (b >= 10) {
            clearInterval(newDelay);
            i = 0;
            b = 0;
            console.log('執行成功');
        }
    }, 1000)
    */

    /*
    console.log(browserType);
    browserType = browserType.replace('Moz','');
    console.log(browserType);
    */

    //字首大寫演算
    /*
        for (let i = 0; i < cities.length; i++) {
            let input = cities[i];
            let smallCity = input.toLowerCase();
            let firstCity = smallCity.slice(0,1);
            let newCity = smallCity.replace(smallCity.slice(0,1),firstCity.toUpperCase());
            console.log(newCity);
    
            let result = newCity;
            let listItem = document.createElement('li');
            listItem.textContent = result;
            preview.appendChild(listItem);   
}*/

    /*
    //演算取得陣列資料中的某段資料
        for (var i = 0; i < stations.length; i++) {
            let input = stations[i];
            let stationNo = input.slice(0, 3);
    
            let theIndexNumber = input.indexOf(';');
            let stationNameData = input.slice(theIndexNumber+1);
    
            let stationName = stationNo + ': ' + stationNameData;
    
            let result = stationName;
            let listItem = document.createElement('li');
            listItem.textContent = result;
            preview.appendChild(listItem);
            console.log(i);
        }
    
     */










}

playMe.addEventListener('click', delayExcution);
// console.log(browserType.length);