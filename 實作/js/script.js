let vw = Math.max(document.documentElement.clientWidth)  //取得視口寬度

let photoNameArray = []; //相片名稱

//取得相片按鈕的div位置
const resultsPhotoButton = document.getElementsByClassName('resultsPhotoButton');
const modalStorageArea = document.getElementById('modalStorageArea');




//取得相片名子
function getPhotoNameString() {
    const photoNameId = document.getElementsByTagName('template')[0];
    let photoName = photoNameId.content.querySelectorAll('p');

    photoName.forEach(function (item) {

        let index = item.outerText;            //outerText 是html標籤屬性 只包含標籤內容 不包含標籤本身
        let semicolonIndex = index.indexOf(';');             //取得 ; 分號所在的索引位置 (return 數字)
        let colonIndex = index.indexOf(':');                 //取得 : 冒號所在的索引位置 (return 數字)
        let extensionIndex = index.indexOf('%');

        let CName = index.slice(0, semicolonIndex);                                 //只取中文名稱
        let EName = index.slice(semicolonIndex + 1, colonIndex);                    //只取英文名稱
        let photo = Number(index.slice(colonIndex + 1, extensionIndex));            //取數字 將字串轉為數字
        let extension = index.slice(extensionIndex + 1);                            //取副檔名

        //把結果做成 object 推入陣列
        photoNameArray.push({
            chineseName: CName,
            englishName: EName,
            numberOfPhotos: photo,
            photoExtension: extension
        });
        

    });

    
}
getPhotoNameString();



//製作相片按鈕
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

    //圖片大小
    let photoSize;              //決定圖片大小
    if (vw <= 767) {            //檢查裝置大小 決定圖片大小
        photoSize = 200;
    } else {
        photoSize = 400;
    };

    photoNameArray.forEach(function (item, index) {
        if (index == 0) {
            // 檢查是否為第一個 如果是要加入active標籤
            dataBox = `
                <div class="carousel-item text-center active">
                    <button type="button" class="btn shadow-none " data-bs-toggle="modal"
                        data-bs-target="#${item.englishName}">
                        <img src="images/logo/${item.chineseName}.${item.photoExtension}" style="width: ${photoSize}px; height: ${photoSize}px;" alt="">
                        <p>${item.chineseName}</p>
                    </button>
                </div>
            `;
            dataArray.push(dataBox);        //把結果推入陣列中
        } else {
            dataBox = `
                <div class="carousel-item text-center">
                    <button type="button" class="btn shadow-none " data-bs-toggle="modal"
                        data-bs-target="#${item.englishName}">
                        <img src="images/logo/${item.chineseName}.${item.photoExtension}" style="width: ${photoSize}px; height: ${photoSize}px;" alt="">
                        <p>${item.chineseName}</p>
                    </button>
                </div>
            `;
            dataArray.push(dataBox);         //把結果推入陣列中
        }
    });

    getStringData = dataArray.join('');                 //把陣列資料轉成字串給getStringData
    resultsPhotoButton[0].innerHTML = getStringData;    //把getStringData的內容取代javaTestClass中的內容

}



//歷年實績互動視窗內容
function makeModalStorageAreaDiv() {

    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中
    let getStringData;      //取得dataArray中轉換成字串的資料

    //互動視窗相片是特規
    let ModalphotoSize;         //決定圖片大小
    if (vw <= 767) {            //檢查裝置大小 決定圖片大小
        ModalphotoSize = 150;
    } else if (vw <= 1023) {
        ModalphotoSize = 200;
    } else {
        ModalphotoSize = 350;
    }

    photoNameArray.forEach(function (item) {

        dataBox = `
            <div class="modal fade" id="${item.englishName}" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div class="testCss achievementContent modal-content border border-1">

                        <div class="modal-header ">
                            <h5 class="modal-title text-light" id="staticBackdropLabel">${item.chineseName}</h5>
                            <button type="button" class="btn-close shadow-none bg-light border border-4"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body py-5">
                            <div class="container-fluid">
                                <div id="${item.englishName}Id" class =" row gy-4 text-center">
                                    <!-- 相片內容放置區 用id抓div -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        dataArray.push(dataBox);
    });

    getStringData = dataArray.join('');
    modalStorageArea.innerHTML = getStringData; //先將殼推入html

    dataBox = '';                               //上方動作都做完了才清空儲存區防止bug
    dataArray = [];
    getStringData = '';



    //製作互動視窗內容相片
    photoNameArray.forEach(function (item) {
        /**
         *  巢狀迴圈 
         *      第一層抓photoNameArray的資料數 決定要執行幾次
         *          第二層抓指定的相片數量來製作對應數量的div DOM
         * 
         *  抓取英文名子後方 + 上'Id'來對應上方相片按鈕的id名稱
         *  只有上方做出來之後才能抓到id名稱所以doc寫在這
         */

        let idName = item.englishName + 'Id';               //製作用於抓取的class名稱
        let getId = document.getElementById(idName);        //取得class

        for (let a = 0; a < item.numberOfPhotos; a++) {     //根據當下item的相片數量製造幾次裝相片的div
            dataBox = `
                <div class="col-6">
                    <img src="images/photo/${item.chineseName}/${item.chineseName}${a}.${item.photoExtension}" style="width: ${ModalphotoSize}px;" alt="">
                </div>
            `
            dataArray.push(dataBox);                //推至dataArray
        }

        getStringData = dataArray.join('');         //取得做好的dataBox
        getId.innerHTML = getStringData;            //把dataBox推入getId

        dataBox = '';                               //清空儲存區防止bug
        dataArray = [];
        getStringData = '';
    });

}

makePastExperiencePhotoDiv();       //執行製作歷年實績相片函式
makeModalStorageAreaDiv();          //執行歷年實績互動視窗內容函式






































