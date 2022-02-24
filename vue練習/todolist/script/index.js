Vue.component('article-box', {
    data: function () {
        return {

        }
    },
    template: `
    <transition>
        <div v-if="itemShow"
            class="article d-flex flex-column justify-content-start text-start col-12  mb-3 px-3">
                        <!-- 內文 -->
            <h3 class="mb-4 px-1">測試標題</h3>
            <p class="px-1">對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。
            </p>
                        <!-- 狀態圖片 -->
            <div class="listState">
                <img :src="itemState" alt="">
            </div>
                        <!-- 設定選單 -->
                        
            <div class="itemList">
                <button @click="setItem" class="setButton" type="button">
                    <div></div>
                </button>
                <ul class="closeItem d-flex flex-column justify-content-around px-3">
                    <li>
                        <button @click="clickButton">待辦</button>
                    </li>
                    <li>
                        <button @click="clickButton">結案</button>
                    </li>
                    <li>
                        <button @click="clickButton">刪除</button>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    `,
    props: [''],
    methods: {

    }

})

let data = {
    articleDataArray: [
        {
            id: 0,
            title: '測試標題',
            content: '對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            shortContent: '對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。'
        },
        {
            id: 1,
            title: '測試標題2',
            content: '222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            shortContent: '222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。222...'
        }
    ],

    listState: {
        state: true,
        img: '/images/check.png',
    },

    itemButton: false,  //設定按鈕
    itemShow: true,     //刪除文章淡出
    articleForm: false, //添加代辦事項淡入淡出



    /****************************************************************
                                父組件
     ****************************************************************/
    articleShow: false,  //!完整文章淡入
    editArticleH2: '添加代辦事項',          //修改或新增文章區的標題
    // !對form表單用v-model 來雙向綁定 才不用一直  parentNode 找dom原素
    UIShow: true,                           //介面顯示

    // 用於新增、修改、顯示全文章的區域。
    form: {
        edit: false,
        id: '',
        title: '',
        content: '',
    }


}


let app = new Vue({
    el: '#app',
    data: data,
    created() {
        console.log(document.cookie);
    },
    methods: {

        /****************************************************************
                                    貼文設定按鈕 
        *****************************************************************/
        setItem: function (e) {                     //設定按鈕按下時展開選單
            let vm = this;
            let fatherDiv = e.target.parentNode.childNodes;
            let kidButton;
            let kidUl;

            fatherDiv.forEach(function (e) {

                switch (e.localName) {
                    case 'button':
                        kidButton = e;              //取得按鈕
                        break;
                    case 'ul':
                        kidUl = e;                  //取得清單
                        break;
                }
            })
            if (vm.itemButton === false && kidButton !== undefined && kidUl !== undefined) {

                vm.itemButton = true;
                //切換展開狀態
                // console.log(kidUl);
                kidUl.classList.toggle('closeItem');
                kidUl.classList.toggle('openItem');

                //如果按鈕失去焦點就收起清單
                kidButton.addEventListener('blur', function packUpItem(e) {
                    setTimeout(() => {
                        vm.itemButton = false;
                        //切換展開狀態
                        kidUl.classList.toggle('closeItem');
                        kidUl.classList.toggle('openItem');
                        //移除監聽
                        kidButton.removeEventListener('blur', packUpItem);     //刪除監聽
                    }, 50)
                })
            }

        },
        clickButton: function (e, id) {                 //按下選單按鈕時
            // console.log(e);
            // console.log(id);
            let vm = this;
            const textx = e.srcElement.outerText;   //取得文字

            switch (textx) {
                case '待辦':
                    vm.itemState = {
                        state: false,
                        img: '/images/close.png'
                    }

                    break;
                case '結案':
                    vm.itemState = {
                        state: true,
                        img: '/images/check.png'
                    }
                    break;
                case '修改':
                    vm.form.edit = true;
                    vm.articleForm = true;
                    vm.editArticleH2 = '修改清單';
                    for (let event of vm.articleDataArray) {  //
                        if (event.id === id) {
                            // console.log(vm.form.title);
                            vm.form.id = event.id;            //用來找是哪個id要被修改
                            vm.form.title = event.title;      //修改前的標題
                            vm.form.content = event.content;  //修改前的內容
                            break;                              //如果id符合就跳出
                        }
                    }

                    break;
                case '刪除':
                    //刪除(只刪除dom元素而已)
                    let rootElement = e.target.parentNode.parentNode.parentNode.parentNode
                    vm.itemShow = false;

                    setTimeout(function () {
                        rootElement.remove();
                    }, 1000)
                    break;
            }

        },
        /****************************************************************
                            顯示全文章狀態切換
        ****************************************************************/

        //  開啟全文章閱讀區
        articleState: function (event, id) {
            console.log(event, id);
            if (this.UIShow === true && this.itemButton === false) {
                this.UIShow = false;            //是否顯示UI
                this.articleShow = true;        //是否顯示文章
            } else if (this.UIShow === false && this.itemButton === false) {
                this.UIShow = true;
                this.articleShow = false;

                this.closeEditArticle();            //清空顯示區
                return;
            }

            for (let event of this.articleDataArray) {
                if (event.id === id) {
                    // console.log(this.form.title);
                    this.form.title = event.title;      //修改前的標題
                    this.form.content = event.content;  //修改前的內容
                    break;                              //如果id符合就跳出
                }
            }
        },

        //  關閉設定或添加文章區
        closeEditArticle: function (e) {
            let vm = this;
            //將v-model的內容清空
            setTimeout(function () {
                vm.form.id = '';
                vm.form.title = '';
                vm.form.content = '';
                vm.editArticleH2 = '添加代辦事項';
            }, 700);
            vm.articleForm = false;           //修改文章區關閉
            vm.form.edit = false;             //修改文章狀態false
        },

        /****************************************************************
                                    修改貼文
        ****************************************************************/
        editArticle: function (e) {
            // !取得傳入的參數 再去articleDataArray 用id找對應的資料修改
            let vm = this;
            // console.log(id);

            for (let event of vm.articleDataArray) {  //
                if (event.id === vm.form.id) {
                    // console.log(vm.form.title);
                    event.title = vm.form.title;                                    //修改前的標題
                    event.content = vm.form.content;                                //修改前的內容
                    event.shortContent = vm.shortenTheContent(vm.form.content);     //縮短內容
                    break;                                                          //如果id符合就跳出
                }
            }

            vm.closeEditArticle();                                                  //清空顯示區

        },
        // 縮短顯示在清單的內容
        shortenTheContent: function (e) {

            //如果字串長度超過120如果字串長度超過120
            let textLength = e.replace(/[^\x00-\xff]/g, 'oo').length;

            if (textLength > 120) {
                let getData = e.slice(0, 59);
                let shortData = getData + '...'
                return shortData;
            }
            return e;
        },
        /****************************************************************
                                    新增貼文
        ****************************************************************/
        formSubmit: function (e) {

            if (this.form.edit === true) {          //檢查如果是修改狀態就調用修改方法
                this.editArticle();                 //下方不執行
                return;
            };

            //新增待辦事項方法
            let vm = this;
            let title = this.form.title;
            let content = this.form.content;

            if (title === '' || content === '') {
                alert('標題或內文不能為空。')
                return
            }

            //設定資料格式
            let idData = this.articleDataArray[this.articleDataArray.length - 1].id + 1;
            // !也許儲存成 mysql 時要使用 /n 格式
            let contentData = content.replace(/(\n\r|\r\n|\r|\n)/g, "</br>");               //取得內文 然後把 \n 替換成</br>
            let shortContent = vm.shortenTheContent(contentData);


            //包裝成object
            let box = {
                id: idData,
                title: title,                       //取得標題
                content: contentData,               //取得處裡過後的內容
                shortContent: shortContent          //縮短顯示的內容
            }

            // let str1 = e.target.content.value.replace(/(\n\r|\r\n|\r|\n)/g, "</br>")
            //!用set方法推入陣列，然後依靠 v-for來更新
            vm.$set(vm.articleDataArray, vm.articleDataArray.length, box)

            vm.closeEditArticle();            //清空顯示區
        }
    },
    computed: {
        // !要放入組件
        itemState: {
            //修改代辦事項狀態圖片
            get() {
                return this.listState.img;
            },
            set(e) {
                console.log(e);
                this.listState.state = e.state;
                this.listState.img = e.img;
                console.log(this.listState);
            }
        }
    }
})