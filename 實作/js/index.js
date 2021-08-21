const testhtml = document.body;
const PastExperiencePhoto = document.getElementsByClassName('PastExperiencePhoto');
console.log(PastExperiencePhoto[0]);


function makePastExperiencePhotoDiv() {
    /**
     * 製造字串動態更改 img 元素中的相片編號
     * 把每一次結果都加入dataArray中
     * 把dataArray的內容變成string
     * 再把變成字串的內容加入javaTestClass 的class標籤之下
    */

    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中
    let getStringData;      //取得dataArray中轉換成字串的資料

    for (let a = 0; a < 3; a++) {
        if (a == 0) {
            // 檢查是否為第一個 如果是要加入active標籤
            dataBox = `
                <div class="carousel-item active">
                    <div class="PastExperiencePhoto  text-center">
                        <img src="image/FakerLogo${a}.jpg" style="width: 200px;" alt="">
                        <p>說明文字</p>
                    </div>
                </div>
            `;
            dataArray.push(dataBox);      //把結果推入陣列中
        } else {
            dataBox = `
                <div class="carousel-item">
                    <div class="PastExperiencePhoto  text-center">
                        <img src="image/FakerLogo${a}.jpg" style="width: 200px;" alt="">
                        <p>說明文字</p>
                    </div>
                </div>
            `;
            dataArray.push(dataBox);
        }
    }
    // console.log(dataArray);

    getStringData = dataArray.join('');     //把陣列資料轉成字串給getStringData
    // console.log(getStringData);

    PastExperiencePhoto[0].innerHTML = getStringData;     //把getStringData的內容取代javaTestClass中的內容

}

makePastExperiencePhotoDiv();   //執行製作歷年實績相片函式