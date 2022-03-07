Vue.component('article-box', {
    data: function () {
        let data = this.articleData;
        this.checkDataType('id', data.id, 'number');
        this.checkDataType('itemButton', data.itemButton, 'boolean');
        this.checkDataType('itemShow', data.itemShow, 'boolean');
        this.checkDataType('state', data.state, 'boolean');
        this.checkDataType('stateImg', data.stateImg, 'string');
        this.checkDataType('title', data.title, 'string');
        this.checkDataType('content', data.content, 'string');
        this.checkDataType('originalContent', data.originalContent, 'string');
        return {
            articleDatas: this.articleData          //取得主資料
        }
    },
    template: `
        <transition>

            <div v-if="articleDatas.itemShow" @click.self="changeArticleState"
                class="article d-flex flex-column justify-content-start text-start col-12 mb-3 px-3">
                <h3 @click.self="changeArticleState" class="mb-4 px-1">{{articleDatas.title}}</h3>
                <p @click.self="changeArticleState" v-html="articleDatas.content" class="px-1"></p>


                <div class="listState">
                    <img :src="articleDatas.stateImg" alt="">
                </div>

                <div class="itemList">

                    <button @click.stop="setItem" class="setButton" type="button">
                        <div></div>
                    </button>

                    <ul @click.stop="clickButton"
                        class="closeItem d-flex flex-column justify-content-around px-3">
                        <li>
                            <button>待辦</button>
                        </li>
                        <li>
                            <button>結案</button>
                        </li>
                        <li>
                            <button>修改</button>
                        </li>
                        <li>
                            <button>刪除</button>
                        </li>
                    </ul>
                </div>


            </div>
        </transition>
    
    `,
    props: {
        articleData: {
            type: Object,
            required: true,
        }
    },
    created() {

        console.log(this.articleDatas);

    },
    methods: {
        changeArticleState: function () {           //開啟全文章

            if (this.articleDatas.itemButton === false) {
                this.$emit('article-state-temp', this.articleDatas.title, this.articleDatas.content, this.articleDatas.itemButton);
            }
        },
        setItem: function (e) {                     //展開選單
            let vm = this;
            let fatherDiv = e.target.parentNode.childNodes;     //獲取button 跟ul的array資料
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

            if (vm.articleDatas.itemButton === false && kidButton !== undefined && kidUl !== undefined) {
                vm.$emit('item-button-temp', true);        //把父組件的itemButton 設為true
                //切換展開狀態
                kidUl.classList.toggle('closeItem');
                kidUl.classList.toggle('openItem');
                //如果按鈕失去焦點就收起清單
                kidButton.addEventListener('blur', function packUpItem(e) {
                    setTimeout(() => {
                        kidUl.classList.toggle('closeItem');
                        kidUl.classList.toggle('openItem');
                        //切換展開狀態
                        vm.$emit('item-button-temp', false);        //把父組件的itemButton 設為true
                        //移除監聽
                        kidButton.removeEventListener('blur', packUpItem);     //刪除監聽
                    }, 50)
                })
            }
        },

        clickButton: function (e) {                 //按下選單按鈕時
            let vm = this;
            const textx = e.srcElement.outerText;   //取得文字

            switch (textx) {
                case '待辦':

                    vm.$emit('set-article-state-temp', vm.articleDatas.id, false, '/images/close.png');
                    break;
                case '結案':
                    vm.$emit('set-article-state-temp', vm.articleDatas.id, true, '/images/check.png');
                    break;
                case '修改':
                    vm.$emit('edit-article-temp', vm.articleDatas.id);
                    break;
                case '刪除':
                    // ! 製作到這
                    // let rootElement = e.target.parentNode.parentNode.parentNode.parentNode
                    vm.articleDatas.itemShow = false;
                    vm.$emit('remove-article-temp', vm.articleDatas.id);

                    // setTimeout(function () {
                    //     rootElement.remove();
                    // }, 1000)
                    break;
            }

        },
        checkDataType: function (dataName, data, type) {        //檢查資料
            if (typeof data !== type) {
                throw new Error(`傳入的 ${dataName} 不是 ${type} : ${data}`);
            }
            return;
        }
    }

})

let data = {
    articleDataArray: [                     //!主資料
        {
            id: 0,
            itemButton: false,              //設定按鈕
            itemShow: true,                 //刪除文章淡出
            state: false,
            stateImg: '/images/close.png',
            title: '測試標題',
            content: '對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            originalContent: ''

        },
        {
            id: 1,
            itemButton: false,              //設定按鈕
            itemShow: true,                 //刪除文章淡出
            state: true,
            stateImg: '/images/check.png',
            title: '測試標題2',
            content: '222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            originalContent: ''
        }
    ],

    UIShow: true,                           //介面顯示
    articleShow: false,                     //完整文章淡入
    articleForm: false,                     //新增、修改清單區域淡入淡出
    editArticleH2: '添加代辦事項',          //修改或新增文章區的標題

    // 用於新增、修改、顯示全文章的區域。
    // !對form表單用v-model 來雙向綁定 才不用一直  parentNode 找dom原素
    form: {
        edit: false,
        id: '',
        title: '',
        content: '',
    },
    tempFuncBox: {
        articleState: {
            funName: 'article-state-temp',
            callFun: 'articleState'
        },
        setArticleState: {
            funName: 'set-article-state-temp',
            callFun: 'setArticleState'
        },
        editArticle:{
            funName: 'edit-article-temp',
            callFun: 'editArticle'
        },
        removeArticle:{
            funName: 'remove-article-temp',
            callFun: 'removeArticle'
        },
        itemButton: {
            funName: 'item-button-temp',
            callFun: 'n.itemButton = $event'
        },
        
    }
};

let app = new Vue({
    el: '#app',
    data: data,
    created() {
        // console.log(document.cookie);
    },
    methods: {

        /****************************************************************
                                    貼文設定按鈕 
        *****************************************************************/
        setArticleState: function (id, state, stateImg) {
            if (typeof id !== 'number' && typeof state !== 'boolean' && typeof stateImg !== 'string') {
                return;
            }

            let vm = this;
            for (let event of vm.articleDataArray) {
                if (event.id === id) {
                    event.state = state;
                    event.stateImg = stateImg;
                    break;                              //如果id符合就跳出
                }
            }
        },

        editArticle: function (id) {
            let vm = this;
            vm.form.edit = true;                        //修改模式 on
            vm.articleForm = true;                      //顯示修改區
            vm.editArticleH2 = '修改清單';              //變更標題
            for (let event of vm.articleDataArray) {
                if (event.id === id) {
                    vm.form.id = event.id;              //用來找是哪個id要被修改
                    vm.form.title = event.title;        //修改前的標題
                    vm.form.content = event.content;    //修改前的內容
                    break;                              //如果id符合就跳出
                }
            }
        },
        removeArticle: function (id) {                    //刪除功能
            //找到該資料的索引後刪除
            const index = this.articleDataArray.findIndex(function (e) {
                // if (e.id === id) return true;
                return e.id === id;
            })

            this.articleDataArray.splice(index, 1);

        },
        /****************************************************************
                            顯示全文章狀態切換
        ****************************************************************/

        //  開啟全文章閱讀區
        // articleState: function (event ,id) {
        articleState: function (title, content, itemButton) {
            if (this.UIShow === true && itemButton === false) {
                this.UIShow = false;                //是否顯示UI
                this.articleShow = true;            //是否顯示文章
            } else if (this.UIShow === false && this.articleShow === true) {
                this.UIShow = true;
                this.articleShow = false;

                this.closeEditArticle();            //清空顯示區
                return;
            }
            this.form.title = title;
            this.form.content = content;
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
        updataArticle: function (e) {           //將修改好的內容推入陣列
            // !取得傳入的參數 再去articleDataArray 用id找對應的資料修改
            let vm = this;

            for (let event of vm.articleDataArray) {  //
                if (event.id === vm.form.id) {
                    event.title = vm.form.title;                                    //修改前的標題
                    event.content = vm.form.content;                                //修改前的內容
                    break;                                                          //如果id符合就跳出
                }
            }

            vm.closeEditArticle();            //清空顯示區                                                  //清空顯示區
        },
        /****************************************************************
                                    新增貼文
        ****************************************************************/
        formSubmit: function (e) {

            if (this.form.edit === true) {          //檢查如果是修改狀態就調用修改方法
                this.updataArticle();                 //下方不執行
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
            let contentData = content.replace(/\r?\n/g, "<br>");               //取得內文 然後把 \n 替換成</br>

            //包裝成object
            let box = {
                id: idData,
                itemButton: false,                  //設定按鈕
                itemShow: true,                     //刪除文章淡出
                state: false,                       //預設false
                stateImg: '/images/close.png',      //預設待辦
                title: title,                       //取得標題
                content: contentData,               //取得處裡過後的內容
                originalContent: ''                  //原始內容

            }

            // let str1 = e.target.content.value.replace(/\r?\n/g, "</br>")
            //!用set方法推入陣列，然後依靠 v-for來更新
            vm.$set(vm.articleDataArray, vm.articleDataArray.length, box);
            console.log(vm.articleDataArray);
            vm.closeEditArticle();            //清空顯示區
        }
    },
    computed: {

        // !要放入組件
        // itemState: {
        //     //修改代辦事項狀態圖片
        //     get() {
        //         return this.listState.img;
        //     },
        //     set(e) {
        //         console.log(e);
        //         this.listState.state = e.state;
        //         this.listState.img = e.img;
        //         console.log(this.listState);
        //     }
        // }
    }
})