//!物件開始
//fadein and fadeout動畫物件OOP 開始
function BannerAnimetion(sectionId, className, article1Class, article2Class, bannerMaskClass, opacityCss1, opacityCss2) {

    this.sectionId = sectionId;         //動畫所在的section id
    this.className = className;         //需要跑動畫的div class(如果是以委託觸發方式 此參數要設undefined 並在target宣告後加入參數)
    this.introduction = {               //介紹
        article1Class,                  //mask隱藏(前)介紹文字
        article2Class                   //mask隱藏(後)介紹文字
    };
    this.bannerMaskClass = bannerMaskClass; //動畫遮罩
    this.opacityCss1 = opacityCss1;         //透明化動畫1(變透明)
    this.opacityCss2 = opacityCss2;         //透明化動畫1(變不透明)
}
BannerAnimetion.prototype.fadein = function () {
    //取得遮罩相關的元素
    let article1 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article1Class}`);
    let article2 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article2Class}`);
    let bannerMask = document.querySelector(`#${this.sectionId} .${this.className} .${this.bannerMaskClass}`);
    //加入透明動畫class
    article1.classList.add(this.opacityCss1);
    bannerMask.classList.add(this.opacityCss1);
    article2.classList.add(this.opacityCss2);
}
BannerAnimetion.prototype.fadeout = function () {
    //取得目標class
    let article1 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article1Class}`);
    let article2 = document.querySelector(`#${this.sectionId} .${this.className} .${this.introduction.article2Class}`);
    let bannerMask = document.querySelector(`#${this.sectionId} .${this.className} .${this.bannerMaskClass}`);
    //把指定class刪除
    article1.classList.remove(this.opacityCss1);
    bannerMask.classList.remove(this.opacityCss1);
    article2.classList.remove(this.opacityCss2);
}
//動畫物件OOP 結束

//歷年實績 幻燈片按鈕物件 開始
function SlideObject(scrollDiv, id, idNumber, className, ulElement, objSize, slidePosition) {
    /**
     * 指定參數 (需要移動滾動條的父div元素, 按鈕id, id編號, 要放入按鈕的父ul元素, 幻燈片位移參數)
     */
    this.scrollDiv = scrollDiv;             //幻燈片區域最底層div
    this.id = id;                           //幻燈片按鈕id屬性
    this.idNumber = idNumber;               //id編號 (如果有多個按鈕)
    this.className = className;
    this.ulElement = ulElement;             //要放入按鈕的ul標籤 
    this.objSize = objSize;                  //物件實體大小 + margin的總和大小
    this.slidePosition = slidePosition;     // 位移位置 //如果要位移則要額外增加 例如:(原位置 += 位移參數;) 
}
SlideObject.prototype.createButton = function () {
    /**
     * 指定參數 (需要移動滾動條的父div元素, 按鈕id, id編號, 要放入按鈕的父ul元素)
     */

    //用按鈕物件的參數製作 ol 和 button元素
    let ol = document.createElement('ol');
    let olButton = document.createElement('button');

    //指定 id class type 等參數 
    ol.classList.add('p-0');

    olButton.type = 'button';
    olButton.setAttribute('id', `${this.id}${this.idNumber + 1}`);
    olButton.classList.add(this.className, 'd-block', 'p-0', 'm-0');
    //第一個按鈕需要變色
    if (this.idNumber === 0) {
        olButton.style.backgroundColor = '#000';
    }

    //放入html
    ol.append(olButton);
    this.ulElement.append(ol);

    // 監控按鈕按下事件
    olButton.addEventListener('click', () => {
        //取得所有按鈕id把所有按鈕顏色去除
        // const bElement = document.querySelectorAll();

        setTimeout(() => {
            let e = document.querySelectorAll(`.${this.className}`);
            e.forEach(function (item) {
                item.style.backgroundColor = '';
            });

            //指定這個按鈕變色
            olButton.style.backgroundColor = '#000'

        }, 200);
        //移動到指定位置
        this.scrollDiv.scrollLeft = this.slidePosition;
    });


    //防抖函數執行顏色變換
    function changeButtonColor(slidePosition, className) {

        //!這裡的this已經變成scrollDiv了
        if (this.scrollLeft >= (slidePosition - 50)) {
            let e = document.querySelectorAll(`.${className}`);
            e.forEach(function (item) {
                item.style.backgroundColor = '';
            });
            olButton.style.backgroundColor = '#000'
        }
    };
    //防抖函數 要執行的方法 和 延遲時間
    function debounce(func, SPosition, CName, delay) {
        let timer;              //先宣告時間變量才能執行 刪除延遲 設定延遲
        return function () {
            let context = this;     //此時this是指向呼叫這個方法的 this.scrollDiv，因為return this會指向window 把this 儲存起來。
            clearTimeout(timer);    //清除延遲來達成重新計時的功能
            timer = setTimeout(function () {
                func.call(context, SPosition, CName); //!用call 綁定 this 給 changeButtonColor，apply 參數需要是陣列的樣子
            }, delay);
        }
    };

    this.scrollDiv.addEventListener('scroll', debounce(changeButtonColor, this.slidePosition, this.className, 50));

}
//歷年實績 幻燈片按鈕物件 結束
//!物件結束

// !程式開始

const titleName = document.querySelector('head title').outerText; //取得title名子用來判斷

//檢查是不是首頁


vw = Math.max(document.documentElement.clientWidth);  //取得視口寬度
let vh = window.innerHeight * 0.01;         //手機端動態調整banner高度

//設定header的大小 如果是行動端就要減去瀏覽器上方導覽條的高度
const header = document.querySelector('header');
header.style.setProperty('--vh', `${vh}px`);

// 等待視窗全部載好才執行
window.onload = function () {
    //取得loading圖片
    const loadingClass = document.querySelector('.loadingClass');

    // **hader橫版面動畫 開始**
    const bannerMask = document.getElementById('bannerMask');
    const bannerLogo = document.querySelector('header .bannerLogo');        //logo
    const bannerH2Title = document.querySelectorAll('header .bannerH2Title h2');      //h2標題
    const bannerSamp = document.querySelectorAll('header .bannerH2Title samp');    //h2文字底線

    setTimeout(() => {
        loadingClass.remove();      //刪除loading圖片
        //網頁load完成不要馬上執行
        bannerMask.style.animation = 'banner 1s ease forwards';
        setTimeout(() => {
            bannerLogo.style.animation = 'bannerFadein 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';

            setTimeout(() => {
                //h2文字
                let i = 0;
                let bannerH2Ani = setInterval(() => {
                    bannerH2Title[i].style.animation = 'bannerH2 1s ease-out forwards';
                    i++
                    if (i === 5) {
                        bannerSamp.forEach(e => {
                            setTimeout(() => {
                                e.style.animation = 'bannerSamp 1s ease-out forwards'
                            }, 1000)
                        });
                        clearInterval(bannerH2Ani);     //停止動畫重複
                    }
                }, 100);
            }, 750);
        }, 500);
    }, 500);//500
    // **hader橫版面動畫 結束**


    // **服務項目淡入淡出動畫 開始**
    if (vw >= 1024) {
        const serviceItems = document.getElementById('serviceItems');

        //實例化banner物件
        let bannerAnimetion = new BannerAnimetion('serviceItems', undefined, 'article1', 'article2', 'bannerMask', 'opacityOpaque', 'opacityTransparent');

        //監視進入事件
        serviceItems.addEventListener('mouseover', e => {

            const getDivEvente = e.target;                                  //當下移入的元素
            const getDivFather = getDivEvente.parentNode;                   //動畫遮罩父元素
            const getDivFatherClass = getDivEvente.parentNode.classList;    //取得該元素的class名稱
            let getClassName;                                             //用來存取找到的class用來檢查(如果是指定參數 就把該參數加入物件中)

            for (let i = 0; i < getDivFatherClass.length; i++) {
                if (getDivFatherClass[i] === 'SoundEngineer') {
                    getClassName = getDivFatherClass[i];
                    //在物件中加入指定目標class名稱
                    bannerAnimetion.className = getClassName;
                    break;  //跳出迴圈

                } else if (getDivFatherClass[i] === 'Light') {
                    getClassName = getDivFatherClass[i];
                    //在物件中加入指定目標class名稱
                    bannerAnimetion.className = getClassName;
                    break;  //跳出迴圈
                }
            }





            if (getClassName === 'SoundEngineer') {
                bannerAnimetion.fadein();

                getDivFather.addEventListener('mouseout', function deletListen() {
                    bannerAnimetion.fadeout();
                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })
            } else if (getClassName === 'Light') {
                bannerAnimetion.fadein();

                getDivFather.addEventListener('mouseout', function deletListen() {
                    bannerAnimetion.fadeout();
                    // 滑鼠移出時刪除監聽器
                    getDivFather.removeEventListener('mouseout', deletListen);
                })
            }
        })
    }
    // **服務項目淡入淡出動畫 結束**
}



//**歷年實績區 開始 */



//json檔案位置
const url = 'http://huesheng.com/JSON/photoData.json';

//!要製作的次數
const photoCount = 9;
//滾動條區
const scrollLeftDiv = document.getElementById('scrollLeftDiv');  //照片按紐區
//內容區
const navDiv = document.querySelector('#scrollLeftDiv>nav');
//幻燈片位置
let divPosition = 0;
let slideUl = document.querySelector('#slideButton>ul');

//相片內容存放區位置
const modalStorageArea = document.getElementById('modalStorageArea');

//滾動按鈕
let slidePhotoCount;        //幻燈片中同時顯示照片的數量
let slideCount = 0;         //按鈕編號


//判斷幻燈片中的同時顯示照片數量

if (vw < 768) {
    slidePhotoCount = 1;
} else {
    slidePhotoCount = 3;
}

// 取得相片名子 json
function ajaxGetJson(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //把取得的json 轉換成物件 否則沒辦法用

                    let jsonData = JSON.parse(xhr.response);

                    //成功時回傳
                    resolve(jsonData);
                } else {
                    //否則回傳錯誤
                    reject(new Error(xhr));
                }
            };
        };
        xhr.send();
    });
}


//先呼叫 ajaxGetJson 方法並傳入網址參數 Promise 回傳結果會在.then處裡
ajaxGetJson(url)
    .then((xhrJson) => {
        // 過濾json檔案 取得 frontPage第一個屬性為true的物件
        let showFrontPage = xhrJson.filter(e => e.frontPage.showThisPhoto && e.frontPage.rank !== null);
        // 泡沫排序 透過 frontPage中的rank屬性來排序
        for (let i = 0; i < showFrontPage.length - 1; i++) {
            for (let j = 0; j < showFrontPage.length - 1 - i; j++) {
                if (showFrontPage[j].frontPage.rank > showFrontPage[j + 1].frontPage.rank) {
                    let temp;
                    temp = showFrontPage[j];
                    showFrontPage[j] = showFrontPage[j + 1];
                    showFrontPage[j + 1] = temp;
                }
            }
        }

        return showFrontPage;
    })
    .then((showFrontPage) => {
        //把成功取得的回傳值當作參數呼叫製作相片按鈕方法
        //檢查是不是首頁
        if (titleName === '輝昇聲光燈光音響工程') {
            makePhotoDiv(showFrontPage);
            return showFrontPage;
        } else {
            return null;
        }
    })
    .then((showFrontPage) => {
        if (showFrontPage !== null) {
            makeModalStorageAreaDiv(showFrontPage);
        }
    })
    .catch((err) => {
        //如果失敗執行這裡
        console.log('Json讀取失敗: ' + err);
    })
    .finally(() => {
        //不管怎樣最後一定執行觀測方法
        contantLazyLoading();
    })



//製作相片按鈕
function makePhotoDiv(event) {
    for (let i = 0; i < photoCount; i++) {
        //製作存放box元素
        let divBox = document.createElement('div');
        //按紐
        let buttonBox = document.createElement('button');
        //圖片
        let imgBox = document.createElement('img');
        //敘述
        let narrateBox = document.createElement('div');
        //活動類型
        let pTypeDiv = document.createElement('div');
        let pType = document.createElement('p');
        let pTypeSamp = document.createElement('samp');
        //活動敘述
        let pDivBox1 = document.createElement('div');
        let pBox = document.createElement('p');

        //外框divBox
        divBox.classList.add('navClass', 'carousel-item', 'p-0', 'text-center');

        // 設定最後一個圖片的右邊寬度
        if (i === photoCount - 1) {
            let positionSet = document.createElement('div');
            positionSet.style.position = 'absolute';
            positionSet.style.right = '-23px';      //參數與圖片之間的寬度配合
            positionSet.style.padding = '0.1px'
            divBox.append(positionSet);
        }

        //照片按紐
        buttonBox.type = 'button';
        buttonBox.classList.add('d-flex', 'flex-column', 'justify-content-start', 'align-items-center', 'btn', 'shadow-none', 'p-0');
        buttonBox.setAttribute('data-bs-toggle', 'modal');
        buttonBox.setAttribute('data-bs-target', `#${event[i].englishName}`);
        //圖片(因為有用懶加載所以使用 data-src)
        imgBox.setAttribute('data-src', `images/photo/${event[i].date.year}/${event[i].date.month}/${event[i].date.day}/${event[i].chineseName}/${event[i].chineseName}0.${event[i].photoExtension}`)
        imgBox.alt = `${event[i].chineseName}預覽圖`;


        //敘述盒子
        narrateBox.classList.add('activityNarrate', 'text-dark', 'my-4');
        //活動類型
        pTypeDiv.classList.add('px-1', 'my-2');
        pType.classList.add('activityC1', 'fs-5', 'fw-bold');
        pTypeSamp.innerHTML = event[i].activityType;

        //照片敘述
        pDivBox1.classList.add('my-3');
        pBox.classList.add('activityC2', 'fw-bold');

        pBox.innerHTML = event[i].chineseName;


        //依序插入 divBox>按紐>內文>圖片
        divBox.append(buttonBox);

        //活動類型
        pTypeDiv.append(pType);
        pType.append(pTypeSamp);
        //敘述
        pDivBox1.append(pBox);
        //類型和敘述組合進div中
        narrateBox.append(pTypeDiv);
        narrateBox.append(pDivBox1);

        //圖片和敘述插入button
        buttonBox.append(imgBox);
        buttonBox.append(narrateBox);

        // navDiv元素 > divBox
        navDiv.append(divBox);

        //如果照片已經填滿顯示畫面就製作一個按紐
        if (i % slidePhotoCount === 0) {
            ModalStorageAreaDivScrollButton();
        }
    }
}

//歷年實績滾動按鈕
function ModalStorageAreaDivScrollButton() {

    // slideButton位移按鈕製作  ( 這裡是依靠上面製作出的div物件 必須在這裡 )
    const scrollContantBox = document.querySelector('#scrollLeftDiv .navClass');
    //取得本體寬度
    const navClassBodyWidth = scrollContantBox.clientWidth;
    //取得 左右margin寬度 並將字串轉換成數字
    const navClassMarginLeft = getComputedStyle(scrollContantBox).marginLeft;
    const navClassMarginRight = getComputedStyle(scrollContantBox).marginRight;
    const navClassMarginX = Number(navClassMarginLeft.replace('px', '')) + Number(navClassMarginRight.replace('px', ''));

    //照片按鈕本體x軸大小+上 margin大小
    const navClassWidth = navClassBodyWidth + navClassMarginX;

    //製作按鈕物件
    let slideObject = new SlideObject(scrollLeftDiv, 'slideMoveButton', slideCount, 'achievementClass', slideUl, navClassMarginX, divPosition);

    slideObject.createButton();

    //按鈕id編號++
    slideCount++;
    //給每個按鈕指定位置
    divPosition += navClassWidth * slidePhotoCount;
}


//歷年實績互動視窗內容
function makeModalStorageAreaDiv(event) {
    let dataBox;            //暫時存放製作好的字串
    let dataArray = [];     //製作好的字串會加入到這個宣告中
    let getStringData;      //取得dataArray中轉換成字串的資料

    //製作用於抓取的ID名稱

    for (let i = 0; i < photoCount; i++) {
        let idName = event[i].englishName + 'Id';   //統一化id命名否則有機率出bug

        dataBox = `
            <div class="modal fade" id="${event[i].englishName}" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div class="testCss achievementContent modal-content border border-1">

                        <div class="modal-header ">
                            <h5 class="modal-title text-light " id="staticBackdropLabel">${event[i].chineseName}</h5>
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
    }


    getStringData = dataArray.join('');
    modalStorageArea.innerHTML = getStringData; //先將殼推入html

    dataBox = '';                               //上方動作都做完了才清空儲存區防止bug
    dataArray = [];
    getStringData = '';


    for (let i = 0; i < photoCount; i++) {
        /**
        *  巢狀迴圈 
        *      第一層抓JSON的資料數 決定要執行幾次
        *          第二層抓指定的相片數量來製作對應數量的div DOM             * 
        *  抓取英文名子後方 + 上'Id'來對應上方相片按鈕的id名稱                 *  只有上方做出來之後才能抓到id名稱所以doc寫在這
        */
        const idName = event[i].englishName + 'Id';
        const getId = document.getElementById(idName);        //取得ID

        for (let a = 0; a < event[i].numberOfPhotos; a++) {     //根據當下event[i]的相片數量製造幾次裝相片的div
            dataBox = `
                <div class="col-12 col-lg-6">
                    <img data-src="images/photo/${event[i].date.year}/${event[i].date.month}/${event[i].date.day}/${event[i].chineseName}/${event[i].chineseName}${a}.${event[i].photoExtension}" style="width: 100%; hight: 100%;" alt="${event[i].chineseName}${[a]}">
                </div>
            `
            dataArray.push(dataBox);                //推至dataArray
        }

        getStringData = dataArray.join('');         //取得做好的dataBox
        getId.innerHTML = getStringData;            //把dataBox推入getId

        dataBox = '';                               //清空儲存區防止bug
        dataArray = [];
        getStringData = '';
    }
}


//**歷年實績區 結束 */





//觀察
function contantLazyLoading() {

    //取得每一張圖片
    // const achievementImages = document.querySelectorAll('#achievement img');
    // const modalStorageAreaImages = document.querySelectorAll('#modalStorageArea img');
    const images = document.querySelectorAll('img');

    //每個擁有DOMFadeinAni 的class名稱都要執行淡入動畫
    const DOMFadeinAni = document.querySelectorAll('.DOMFadeinAni');


    //透過observer實例callback此方法
    //圖片觀察
    const imageCallback = entries => {
        //傳入的參數中有一個 isIntersecting 屬性 (true : 圖片被看到) (false : 圖片沒被看到)
        entries.forEach(entry => {
            if (entry.isIntersecting) {     //如果為true代表看到圖片
                const image = entry.target;                         //被看到的圖片
                const data_src = image.getAttribute('data-src');    //取得圖片中的data-src屬性值
                image.setAttribute('src', data_src);                //創造src屬性 並賦予他上面取得的 data-src 屬性
                image.removeAttribute('data-src');  //刪除 data-src 屬性
                // console.log(image.getAttribute('src'));
                imageObserver.unobserve(image);                          //刪除觀察動作  不要讓他繼續觀察
            }
        })
    }

    //文字觀察
    const textCallback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                setTimeout(() => {
                    text.style.animation = 'textDomLook 1s ease-out forwards';
                    setTimeout(() => {
                        text.classList.remove('DOMFadeinAni');
                        text.style.animation = '';
                        textObserver.unobserve(text);
                    }, 1000);
                }, 300);
            }
        })
    }


    //實例化IntersectionObserver api
    const imageObserver = new IntersectionObserver(imageCallback);  //圖片
    const textObserver = new IntersectionObserver(textCallback);    //文字


    //遍歷每一個圖片 把 observer中的 observe 方法都加到圖片中 觀察圖片

    //圖片
    // registerObserveEvent(achievementImages, imageObserver);
    // registerObserveEvent(modalStorageAreaImages, imageObserver);
    registerObserveEvent(images, imageObserver);
    //文字
    registerObserveEvent(DOMFadeinAni, textObserver);

}
//forEach每一個物件都註冊觀察事件
function registerObserveEvent(eventArray, observeObject) {
    eventArray.forEach(image => {
        observeObject.observe(image);
    })
}








