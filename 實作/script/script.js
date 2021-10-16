let vw = Math.max(document.documentElement.clientWidth)  //取得視口寬度

// 等待視窗全部載好才執行
window.onload = function () {
    // **hader橫版面動畫 開始**
    setTimeout(() => {
        let bannerMask = document.getElementById('bannerMask');
        bannerMask.style.animation = 'banner 2s ease forwards';

    }, 300)
    // **hader橫版面動畫 結束**

    // **服務項目淡入淡出動畫 開始**
    if (vw >= 1024) {
        const serviceItems = document.getElementById('serviceItems');

        //監視進入事件
        serviceItems.addEventListener('mouseover', e => {

            const getDivEvente = e.target;                                  //當下移入的元素
            const getDivFather = getDivEvente.parentNode;                   //動畫遮罩父元素
            const getDivFatherClass = getDivEvente.parentNode.classList;    //取得該元素的class名稱
            let getClassName;                                               //用來存取找到的class用來檢查

            for (let i = 0; i < getDivFatherClass.length; i++) {
                if (getDivFatherClass[i] === 'SoundEngineer') {
                    getClassName = getDivFatherClass[i];
                    break;  //跳出迴圈

                } else if (getDivFatherClass[i] === 'Light') {
                    getClassName = getDivFatherClass[i];
                    break;  //跳出迴圈

                } else if (i === getDivFatherClass.length - 1) {
                    break;

                }
            }

            if (getClassName === undefined) {
                //檢查進來的資料是不是字串
                return;

            } else if (getClassName === 'SoundEngineer') {
                //取得遮罩相關的元素
                let article1 = document.querySelector('#serviceItems .SoundEngineer .article1');
                let bannerMask = document.querySelector('#serviceItems .SoundEngineer .bannerMask');
                let article2 = document.querySelector('#serviceItems .SoundEngineer .article2');

                //加入透明動畫class
                article1.classList.add('opacityOpaque');
                bannerMask.classList.add('opacityOpaque');
                article2.classList.add('opacityTransparent');

                //加入滑鼠移出監視器
                getDivFather.addEventListener('mouseout', function deletListen() {
                    article1.classList.remove('opacityOpaque');
                    bannerMask.classList.remove('opacityOpaque');
                    article2.classList.remove('opacityTransparent');

                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })

            } else if (getClassName === 'Light') {

                let article1 = document.querySelector('#serviceItems .Light .article1');
                let bannerMask = document.querySelector('#serviceItems .Light .bannerMask');
                let article2 = document.querySelector('#serviceItems .Light .article2');

                article1.classList.add('opacityOpaque');
                bannerMask.classList.add('opacityOpaque');
                article2.classList.add('opacityTransparent');

                getDivFather.addEventListener('mouseout', function deletListen() {
                    article1.classList.remove('opacityOpaque');
                    bannerMask.classList.remove('opacityOpaque');
                    article2.classList.remove('opacityTransparent');

                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })

            }
        })
    }
    // **服務項目淡入淡出動畫 結束**
}





//**歷年實績區 開始 */
const leftButton = document.getElementById('leftButton');       //左按紐
const rightButton = document.getElementById('rightButton');     //右按紐

//滾動條區
const scrollLeftDiv = document.getElementById('scrollLeftDiv');  //照片按紐區
const scrollLeftWidth = scrollLeftDiv.clientWidth;               // 滾動條區寬度
//內容區
const navDiv = document.querySelector('#scrollLeftDiv>nav');
//幻燈片位置
let divPosition = 0;
let slideUl = document.querySelector('#slideButton>ul');

//相片內容存放區位置
const modalStorageArea = document.getElementById('modalStorageArea');
let slideObjectArray = [];  //存放按鈕實例化物件
let slidePhotoCount;        //幻燈片中同時顯示照片的數量
let slideCount = 0;         //按鈕編號

// 幻燈片按鈕物件
function SlideObject(slidePosition) {

    // 位置
    this.slidePosition = slidePosition;
}





//判斷幻燈片中的同時顯示照片數量
if (vw < 768) {
    slidePhotoCount = 1;
} else if (vw < 1399) {
    slidePhotoCount = 2;
} else {
    slidePhotoCount = 3;
}


//取得相片名子
function getPhotoNameString() {
    let url = '../JSON/photoData.json';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let protoDataArray = xhr.response;
                makePastExperiencePhotoDiv(protoDataArray);
            }
        }
    }
    xhr.send()
}
getPhotoNameString();


//製作相片按鈕
function makePastExperiencePhotoDiv(event) {
    event.forEach(function (item, index) {
        //製作存放box元素
        let divBox = document.createElement('div');
        //按紐
        let buttonBox = document.createElement('button');
        //圖片 內文
        let imgBox = document.createElement('img');
        let pDivBox = document.createElement('div');
        let pBox = document.createElement('p');

        //外框divBox
        divBox.classList.add('navClass', 'carousel-item', 'p-0', 'text-center');

        // 設定最後一個圖片的右邊寬度
        if (index + 1 === event.length) {
            let positionSet = document.createElement('div');
            positionSet.style.position = 'absolute';
            positionSet.style.right = '-25px';      //參數與圖片之間的寬度配合
            positionSet.style.padding = '0.1px'
            divBox.append(positionSet);
        }

        //照片按紐
        buttonBox.type = 'button';
        buttonBox.classList.add('d-flex', 'flex-column', 'justify-content-start', 'align-items-center', 'btn', 'shadow-none', 'p-0');
        buttonBox.setAttribute('data-bs-toggle', 'modal');
        buttonBox.setAttribute('data-bs-target', `#${item.englishName}`);
        //圖片
        imgBox.src = `images/logo/${item.chineseName}.${item.photoExtension}`;
        imgBox.alt = `${item.chineseName}圖片按紐`;
        //內文
        pDivBox.classList.add('mb-3');
        pBox.innerHTML = item.chineseName;
        pBox.classList.add('fs-6');

        //依序插入 divBox>按紐>內文>圖片
        divBox.append(buttonBox);

        pDivBox.append(pBox);
        buttonBox.append(pDivBox);

        buttonBox.append(imgBox);

        // navDiv元素 > divBox
        navDiv.append(divBox);


        // slideButton位移按鈕製作
        if (index % slidePhotoCount === 0) {
            //製作按鈕物件
            let slideObject = new SlideObject(divPosition);

            //用按鈕物件的參數製作 ol 和 button元素
            let slideOl = document.createElement('ol');
            let slideOlButton = document.createElement('button');

            //指定 id class type 等參數 
            slideOl.classList.add('p-0');

            slideOlButton.type = 'button';
            slideOlButton.setAttribute('id', `slideMoveButton${slideCount + 1}`);

            slideOlButton.classList.add('d-block', 'p-0', 'm-0');
            if (slideCount === 0) {
                slideOlButton.style.backgroundColor = 'red';
            }

            //放入html
            slideOl.append(slideOlButton);
            slideUl.append(slideOl);

            //按鈕id編號
            slideCount++;
            //給每個按鈕指定位置
            divPosition += scrollLeftWidth;

            //監控按鈕按下事件
            slideOlButton.addEventListener('click', () => {
                //把所有按鈕顏色去除
                for (let i = 0; i < slideCount; i++) {
                    const e = document.getElementById(`slideMoveButton${(i + 1)}`);
                    e.style.backgroundColor = '';
                }
                //指定按鈕變色
                slideOlButton.style.backgroundColor = 'red'

                //移動到指定位置
                scrollLeftDiv.scrollLeft = slideObject.slidePosition;
                console.log(slideObject);
            })
        }
    });

    makeModalStorageAreaDiv(event);
}



//歷年實績互動視窗內容
function makeModalStorageAreaDiv(event) {

    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中
    let getStringData;      //取得dataArray中轉換成字串的資料

    //製作用於抓取的ID名稱


    //互動視窗相片是特規
    let ModalphotoSize;         //決定圖片大小
    if (vw <= 767) {            //檢查裝置大小 決定圖片大小
        ModalphotoSize = 150;
    } else if (vw <= 1023) {
        ModalphotoSize = 200;
    } else {
        ModalphotoSize = 350;
    }

    event.forEach(function (item) {
        let idName = item.englishName + 'Id';   //統一化id命名否則有機率出bug


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
                                <div id="${idName}" class =" row gy-4 text-center">
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
    event.forEach(function (item) {
        /**
         *  巢狀迴圈 
         *      第一層抓JSON的資料數 決定要執行幾次
         *          第二層抓指定的相片數量來製作對應數量的div DOM
         * 
         *  抓取英文名子後方 + 上'Id'來對應上方相片按鈕的id名稱
         *  只有上方做出來之後才能抓到id名稱所以doc寫在這
         */
        const idName = item.englishName + 'Id';
        const getId = document.getElementById(idName);        //取得ID

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




// // 歷年實績區按紐
// //左
// leftButton.addEventListener('click', () => {
//     //按下按鈕後先將按鈕關起來
//     leftButton.disabled = true;

//     if (scrollLeftDiv.scrollLeft % scrollLeftWidth !== 0) {
//         //迴圈持續加 滾動條寬度 直到比目前滾動條位置還大
//         let count = 0;
//         while (count < scrollLeftDiv.scrollLeft) {
//             //count 將超過的參數減去滾動條寬度
//             count += scrollLeftWidth;
//             //判斷如果已經比目前滾動條位置大時進行處理
//             if (count > scrollLeftDiv.scrollLeft) {
//                 //將i取得的參數 減去一次滾動條寬度
//                 let n = count - scrollLeftWidth;
//                 //取得目前滾動條位置減掉取得的n參數
//                 let b = scrollLeftDiv.scrollLeft - n;
//                 //滾動條 參數 減掉 上方取得的參數 來移動到指定位置
//                 scrollLeftDiv.scrollLeft -= b;
//                 break;
//             }
//         }
//     } else {
//         scrollLeftDiv.scrollLeft -= scrollLeftWidth;
//     }
//     setTimeout(() => {
//         leftButton.disabled = false;
//     }, 400);
// })
// //右
// rightButton.addEventListener('click', () => {
//     rightButton.disabled = true;
//     if (scrollLeftDiv.scrollLeft % scrollLeftWidth !== 0) {
//         //迴圈持續加 滾動條寬度 直到比目前滾動條位置還大
//         let count = 0;
//         while (count < scrollLeftDiv.scrollLeft) {
//             //迴圈持續加 滾動條寬度 直到比目前滾動條位置還大
//             count += scrollLeftWidth;
//             //判斷如果已經比目前滾動條位置大時進行處理
//             if (count > scrollLeftDiv.scrollLeft) {
//                 // count - 目前位置 會得到目前位置與最右方的下一個元素之間的距離。
//                 let b = count - scrollLeftDiv.scrollLeft;
//                 scrollLeftDiv.scrollLeft += b;
//                 break;
//             }
//         }
//     } else {
//         scrollLeftDiv.scrollLeft += scrollLeftWidth;
//     }
//     setTimeout(() => {
//         rightButton.disabled = false;
//     }, 400);
// })



//**歷年實績區 結束 */






