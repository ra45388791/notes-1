Vue.component('ArticleBox', {
    props: {
        articleData: {
            type: Object,
            required: true,
        },
    },
    data: function () {
        return {
            articleDatas: this.articleData, // 取得主資料
            fatherItemButton: this.itemButtonState,
        };
    },
    created () {

        // console.log(this.articleDatas);

    },
    methods: {
        changeArticleState: function (e) { // 開啟全文章
            const title = this.articleDatas.title;
            const content = this.articleDatas.content;
            this.$emit('article-state-temp', title, content);
        },
        setItem: function (e) { // 展開選單
            const vm = this;
            // 獲取button 跟ul的array資料
            const fatherDiv = e.target.parentNode.childNodes;
            let kidButton;
            let kidUl;
            // console.log(vm.fatherItemButton);
            fatherDiv.forEach(function (e) {
                switch (e.localName) {
                    case 'button':
                        kidButton = e; // 取得按鈕
                        break;
                    case 'ul':
                        kidUl = e; // 取得清單
                        break;
                }
            });

            vm.$emit('item-button-temp', fatherDiv, kidButton, kidUl);
        },

        clickButton: function (e) { // 按下選單按鈕時
            const vm = this;
            const textx = e.srcElement.outerText; // 取得文字

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
                    this.articleDatas.itemShow = false;
                    console.log(vm.articleDatas.itemShow);
                    vm.$emit('remove-article-temp', vm.articleDatas.id);
                    break;
            }
        },
        checkDataType: function (dataName, data, type) { // 檢查資料
            if (typeof data !== type) {
                throw new Error(`傳入的 ${dataName} 不是 ${type} : ${data}`);
            }
            return;
        },
    },
    // !class="listState區域 要製作事項添加日期+預計達成日期
    template: `
        <transition>

            <div v-if="articleDatas.itemShow" @click.self="changeArticleState"
                class="article d-flex flex-column justify-content-between text-start col-12 mb-3 px-3 pb-3">
                <div>

                    <h3 @click.self="changeArticleState" class="mb-4 px-1">{{articleDatas.title}}</h3>
                    <p @click.self="changeArticleState" v-html="articleDatas.content" class="px-1"></p>
                </div>
                <div class="itemList">

                <button @click.stop="setItem" class="setButton" type="button">
                </button>

                <ul @click.stop="clickButton"
                    class="closeItem d-flex flex-column justify-content-center px-3">
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
                <div class="d-flex justify-content-around">
                    
                    <div id="add" class="listState d-flex justify-content-center align-items-center">
                        <span>3/10</span>
                    </div>
                        
                    <div class="listState">
                        <img :src="articleDatas.stateImg" alt="">
                    </div>

                    <div id="end" class="listState d-flex justify-content-center align-items-center">
                        <span>12/12</span>
                    </div>

                </div>
                    
                


            </div>
        </transition>
    
    `,

});

const data = {
    // !主資料
    articleDataArray: [
        {
            id: 0,
            itemShow: true, // 刪除文章淡出
            menu: false,
            state: false,
            stateImg: '/images/close.png',
            title: '測試標題',
            content: '對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            originalContent: '',

        },
        {
            id: 1,
            itemShow: true, // 刪除文章淡出
            menu: false,
            state: true,
            stateImg: '/images/check.png',
            title: '測試標題2',
            content: '222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。222對面大家引進性質，而且資源分類招聘長大更新時間人事部落格，老師我在民國電視二吸引看過網站，常常沉默，眾多。',
            originalContent: '',
        },

    ],
    appliedArea: 'allItem',
    UIShow: true, // 介面顯示
    itemButton: false,
    articleShow: false, // 完整文章淡入
    articleForm: false, // 新增、修改清單區域淡入淡出
    editArticleH2: '添加代辦事項', // 修改或新增文章區的標題

    // 用於新增、修改、顯示全文章的區域。
    // !對form表單用v-model 來雙向綁定 才不用一直  parentNode 找dom原素
    form: {
        edit: false,
        id: '',
        title: '',
        content: '',
    },


};


// eslint-disable-next-line no-unused-vars
const app = new Vue({
    el: '#app',
    data: data,
    computed: {

        toDoData: function () {
            return this.articleDataArray.filter(function (e) {
                return e.state === false;
            });
        },
        getThingsDoneData: function () {
            return this.articleDataArray.filter(function (e) {
                return e.state === true;
            });
        },
    },
    watch: {
        itemButton: function (newValue, oldValue) {
            // console.log(newValue);
            // console.log(oldValue);
        },
    },
    created () {
        // console.log(document.cookie);
    },
    methods: {

        /*
        ********************************貼文設定按鈕********************************
        */
        // 設定貼文
        editArticle: function (id) {
            const vm = this;
            vm.form.edit = true; // 修改模式 on
            vm.articleForm = true; // 顯示修改區
            vm.editArticleH2 = '修改清單'; // 變更標題
            for (const event of vm.articleDataArray) {
                if (event.id === id) {
                    vm.form.id = event.id; // 用來找是哪個id要被修改
                    vm.form.title = event.title; // 修改前的標題
                    vm.form.content = event.content; // 修改前的內容
                    break; // 如果id符合就跳出
                }
            }
        },

        // 設定貼文事項是否完成
        setArticleState: function (id, state, stateImg) {
            if (typeof id !== 'number' && typeof state !== 'boolean' && typeof stateImg !== 'string') {
                return;
            }

            const vm = this;
            for (const event of vm.articleDataArray) {
                if (event.id === id) {
                    event.state = state;
                    event.stateImg = stateImg;
                    break; // 如果id符合就跳出
                }
            }
        },

        removeArticle: function (id) { // 刪除功能
            // 找到該資料的索引後刪除
            const index = this.articleDataArray.findIndex(function (e) {
                return e.id === id;
            });

            this.articleDataArray.splice(index, 1);
        },

        /*
        *******************************貼文狀態提醒*******************************
        */

        // 開啟選單
        itemButtonState: function (fatherDiv, kidButton, kidUl) {
            const vm = this;
            if (vm.itemButton === false &&
                kidButton !== undefined &&
                kidUl !== undefined) {
                // 把itemButton 設為true
                vm.itemButton = true;

                // 切換展開狀態
                kidUl.classList.toggle('closeItem');
                kidUl.classList.toggle('openItem');
                // 如果按鈕失去焦點就收起清單
                window.addEventListener('mouseup', function packUpItem2 () {
                    // 切換展開狀態
                    kidUl.classList.toggle('closeItem');
                    kidUl.classList.toggle('openItem');
                    // 移除監聽
                    window.removeEventListener('mouseup', packUpItem2);
                    setTimeout(() => {
                        // 把itemButton 設為false
                        vm.itemButton = false;
                    }, 100);
                });
            }
        },

        //  開啟全文章閱讀區
        articleState: function (title, content) {
            if (this.UIShow === true && this.itemButton === false) {
                this.UIShow = false; // 是否顯示UI
                this.articleShow = true; // 是否顯示文章
            } else if (this.UIShow === false &&
                this.itemButton === false &&
                this.articleShow === true) {
                this.UIShow = true;
                this.articleShow = false;
                this.closeEditArticle(); // 清空顯示區
                return;
            }
            this.form.title = title;
            this.form.content = content;
        },

        //  關閉設定或添加文章區
        closeEditArticle: function () {
            const vm = this;
            // 將v-model的內容清空
            setTimeout(function () {
                vm.form.id = '';
                vm.form.title = '';
                vm.form.content = '';
                vm.editArticleH2 = '添加代辦事項';
            }, 700);
            vm.articleForm = false; // 修改文章區關閉
            vm.form.edit = false; // 修改文章狀態false
        },

        /*
        *******************************修改貼文*******************************
        */
        updataArticle: function (e) { // 將修改好的內容推入陣列
            // !取得傳入的參數 再去articleDataArray 用id找對應的資料修改
            const vm = this;

            for (const event of vm.articleDataArray) { //
                if (event.id === vm.form.id) {
                    event.title = vm.form.title; // 修改前的標題
                    event.content = vm.form.content; // 修改前的內容
                    break; // 如果id符合就跳出
                }
            }

            vm.closeEditArticle(); // 清空顯示區
        },
        /*
        *******************************新增貼文*******************************
        */
        formSubmit: function () {
            if (this.form.edit === true) { // 檢查如果是修改狀態就調用修改方法
                this.updataArticle(); // 下方不執行
                return;
            }

            // 新增待辦事項方法
            const vm = this;
            const mainData = this.articleDataArray;
            const title = this.form.title;
            const content = this.form.content;
            let idData = 0; // id預設為0

            if (title === '' || content === '') {
                alert('標題或內文不能為空。');
                return;
            }

            // 設定資料格式
            if (vm.articleDataArray.length !== 0) {
                idData = mainData[mainData.length - 1].id + 1;
            }
            // !也許儲存成 mysql 時要使用 /n 格式
            // 取得內文 然後把 \n 替換成</br>
            const contentData = content.replace(/\r?\n/g, '<br>');

            // 包裝成object
            const box = {
                id: idData,
                itemShow: true, // 刪除文章淡出
                menu: false,
                state: false, // 預設false
                stateImg: '/images/close.png', // 預設待辦
                title: title, // 取得標題
                content: contentData, // 取得處裡過後的內容
                originalContent: '', // 原始內容
            };

            // !用set方法推入陣列，然後依靠 v-for來更新
            vm.$set(vm.articleDataArray, vm.articleDataArray.length, box);
            vm.closeEditArticle(); // 清空顯示區
        },
    },

});

let a = 0;
for (let i = 0; i < 10; i++) {
    a += i;
    console.log(i);
}
console.log(a);
