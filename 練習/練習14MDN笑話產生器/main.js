//定義變量和函數
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');     //按鈕
const story = document.querySelector('.story');

let storyText = '今天氣溫 34 攝氏度，:inserta:出去遛彎。當走到:insertb:門前時，突然就:insertc:。人們都驚呆了，李雷全程目睹但並沒有慌，因為:inserta:是一個 130 公斤的胖子，天氣又辣麼熱。';
let insertX = ['怪獸威利', '大老爹', '聖誕老人'];
let insertY = ['肯德基', '迪士尼樂園', '白宫'];
let insertZ = ['自燃了', '在人行道化成了一坨泥', '變成一條鼻涕蟲爬走了'];



let stringArray = [];
let count = 0;

console.log(stringArray);

// console.log(insertX[0]+insertY[0]+insertZ[0]);
function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];

}


//監聽

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;


    xItem = randomValueFromArray(insertX);
    yItem = randomValueFromArray(insertY);
    zItem = randomValueFromArray(insertZ);

    stringArray.push(xItem);
    stringArray.push(yItem);
    stringArray.push(zItem);

    let n1 = newStory.indexOf(':');
    let n2 = newStory.indexOf(':', n1 + 1)
    let newStoryIndex = newStory.slice(n1, n2 + 1);


    while (newStoryIndex !== '') {
        if (newStory.indexOf(newStoryIndex) === -1) {
            //每次執行都先檢查 newStory 中 找不找得到 newStoryIndex的回傳值 
            //如果找不到才重新搜尋
            n1 = newStory.indexOf(':');
            n2 = newStory.indexOf(':', n1 + 1)

            //沒有這句把 newStoryIndex 中的資料清掉會陷入無限迴圈
            newStoryIndex = newStory.slice(n1, n2 + 1);

            count++;
        } else {
            //如果找到了就把 array的文字取代掉
            newStory = newStory.replace(newStoryIndex, stringArray[count]);
        }
    }

    if (customName.value !== '') {
        //檢查輸入框是否有內容
        let name = customName.value;
        newStory = newStory.replace('李雷', name)
        }

    if (document.getElementById("metric").checked) {
        //檢查英制按鈕是否有被選取
        let temperature = Math.round(34 * (9 / 5) + 32);
        let weight = Math.round(130 * 0.45359237);

        newStory = newStory.replace('34 攝氏', temperature + ' 華氏')
        newStory = newStory.replace('130 公斤', weight + ' 磅')

        

    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
    
}

    