Vue.component('ArticleBox', {
    props: {
        articleData: {
            type: Object,
            required: true,
        },
        itemState: {
            type: Boolean,
            required: true,
        },
    },
    data: function () {
        return {
            articleDatas: this.articleData, // 取得主資料
            itemButtonState: this.itemState, // 選項清單是否打開
        };
    },
    mounted () {
        // console.log(this.itemButtonState);
    },
    computed: {

    },
    watch: {
        // articleData 的 menu 屬性
        'articleData.menu' (newV, oldV) {
            this.articleDatas.menu = newV;
        },
        'articleData.menuClass' (newV, oldV) {
            this.articleDatas.menuClass = newV;
        },
        // item是否打開
        itemState (newV, oldV) {
            this.itemButtonState = newV;
        },
    },
    methods: {
        changeArticleState: function (e) { // 開啟全文章
            const title = this.articleData.title;
            const content = this.articleData.content;
            const setDate = this.articleData.setDate;
            const date = this.articleData.date;

            this.$emit('article-state-temp', title, content, setDate, date);
        },
        setItem: function (e) { // 展開選單
            const vm = this;
            // !父組件的itemButton

            if (vm.itemButtonState === false) {
                // 把itemButton 設為true
                vm.$emit('item-button-temp', true);
                // 切換展開狀態
                vm.$emit('item-class-temp', 'openItem');
                // 如果按鈕失去焦點就收起清單
                window.addEventListener('mouseup', function packUpItem2 () {
                    vm.$emit('item-class-temp', 'closeItem');
                    // 移除監聽
                    window.removeEventListener('mouseup', packUpItem2);
                    setTimeout(() => {
                        vm.$emit('item-button-temp', false);
                    }, 100);
                });
            }
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

                    this.articleDatas.itemShow = false;
                    vm.$emit('remove-article-temp', vm.articleDatas.id);
                    break;
            }
        },
    },
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

                <ul :class="articleDatas.menuClass" @click.stop="clickButton"
                    class="d-flex flex-column justify-content-center py-2 px-3">
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
                <div @click="changeArticleState" class="d-flex justify-content-around">
                    
                    <div id="add" class="listState d-flex justify-content-center align-items-center">
                        <span>{{articleData.setDate.setM}}/{{articleData.setDate.setD}}</span>
                    </div>
                        
                    <div class="listState">
                        <img :src="articleDatas.stateImg" alt="">
                    </div>

                    <div id="end" class="listState d-flex justify-content-center align-items-center">
                        <span>{{articleData.date.m}}/{{articleData.date.d}}</span>
                    </div>

                </div>
                    
                


            </div>
        </transition>
    
    `,
});

const data = {

    // !主資料
    articleDataArray: [

        // {
        //     id: //id,
        //     itemShow: true,                  // 刪除文章淡出
        //     menu: false,
        //     menuClass: 'closeItem',          //menu的開關class
        //     state: false,                    //清單事項是否完成
        //     stateImg: '/images/close.png',   //清單事項狀態圖片
        //     title: '',                       //標題
        //     content: '',                     //內容
        //     setDate: {                       //設定當下的日期
        //         setY: 2022,
        //         setM: 3,
        //         setD: 16,
        //     },
        //     date: {                          //預計完成事項日期
        //         y: 2022,
        //         m: 3,
        //         d: 16,
        //     },

    ],
    axiosUrl: 'https://mysterious-forest-30724.herokuapp.com/',
    // axiosUrl: 'http://localhost:3000/',
    viewScroll: '',
    plusButton: {
        width: 200,
        height: 60,
    },
    // 增加文章按鈕動態更新大小
    appliedArea: 'allItem',
    UIShow: true, // 介面顯示
    UIStyle: {
        allItem: 'buttonMenuClick',
        toDo: 'buttonMenuUnclick',
        getThingsDone: 'buttonMenuUnclick',
        calendar: 'buttonMenuUnclick',

    },
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
        setDate: {},
        date: {},
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
        viewScroll: function (newValue, oldValue) {
            if (newValue > oldValue && this.plusButton.width === 0) {
                this.plusButton.width = 87;
                this.plusButton.height = 87;
            } else if (newValue < oldValue && this.plusButton.width !== 0) {
                this.plusButton.width = 0;
                this.plusButton.height = 0;
            }
        },
    },
    created: async function () {
        const ajaxData = await axios.get(this.axiosUrl);
        this.ajaxArticle(ajaxData.data);
        console.log(ajaxData.data);
    },
    mounted () {
        const vm = this;
        // console.log(document.cookie);
        const viewSize = window.innerWidth;

        if (viewSize < 1024) {
            vm.plusButton.width = 0;
            vm.plusButton.height = 0;
            window.addEventListener('scroll', function () {
                vm.viewScroll = window.scrollY;
            });
        }
    },
    methods: {
        /*
        ********************************UI狀態style********************************
        */
        buttonMenuStyle: function (e) {
            this.UIStyle = {
                allItem: 'buttonMenuUnclick',
                toDo: 'buttonMenuUnclick',
                getThingsDone: 'buttonMenuUnclick',
                calendar: 'buttonMenuUnclick',
            };

            switch (e.target.outerText) {
                case '所有事項':
                    // this.UIStyle.allItem = 'buttonMenuClick';
                    this.UIStyle.allItem = 'buttonMenuClick';
                    break;
                case '待辦':
                    this.UIStyle.toDo = 'buttonMenuClick';
                    break;
                case '結案':
                    this.UIStyle.getThingsDone = 'buttonMenuClick';
                    break;
                case '行事曆':
                    this.UIStyle.calendar = 'buttonMenuClick';
                    break;
            }


            // console.log(button[0]);

            // console.log(e.target);
            // console.log(e.target.parentNode.childNodes);
        },

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
            if (typeof id !== 'string' && typeof state !== 'boolean' && typeof stateImg !== 'string') {
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
        *******************************閱讀功能*******************************
        */
        //  開啟全文章閱讀區
        articleState: function (title, content, setDate, date) {
            const uiBl = this.UIShow;
            const itemBtnBl = this.itemButton;
            const articleBl = this.articleShow;

            if (uiBl === true &&
                itemBtnBl === false &&
                articleBl === false) {
                // 是否顯示UI
                this.UIShow = false;
                // 是否顯示文章
                this.articleShow = true;
            } else if (uiBl === false &&
                itemBtnBl === false &&
                articleBl === true) {
                this.UIShow = true;
                this.articleShow = false;
                // 清空顯示區
                this.closeEditArticle();
                return;
            }
            this.form.title = title;
            this.form.content = content;
            this.form.setDate = setDate;
            this.form.date = date;
        },


        /*
        *******************************修改貼文*******************************
        */
        updataArticle: function (e) { // 將修改好的內容推入陣列
            // !取得傳入的參數 再去articleDataArray 用id找對應的資料修改
            const vm = this;
            const date = vm.form.date;
            const dateData = {
                y: parseInt(date.slice(0, 4)),
                m: parseInt(date.slice(5, 7)),
                d: parseInt(date.slice(8)),
            };

            for (const event of vm.articleDataArray) { //
                if (event.id === vm.form.id) {
                    event.title = vm.form.title; // 修改前的標題
                    event.content = vm.form.content; // 修改前的內容
                    event.date = dateData;
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
            const idData = this.uuid();
            const formTitle = this.form.title;
            const formContent = this.form.content;
            const todayDate = new Date();
            const formDate = this.form.date;

            // !在 created 鉤子修改取得的日期
            const formSetDate = {
                setY: parseInt(todayDate.getFullYear()),
                setM: parseInt(todayDate.getMonth() + 1),
                setD: parseInt(todayDate.getDate()),
            };


            if (formTitle === '' || formContent === '' || typeof formDate !== 'string') {
                // alert('標題、內文或日期不能為空。');
                return;
            }

            // !在 created 鉤子修改取得的日期
            const dateData = {
                y: parseInt(formDate.slice(0, 4)),
                m: parseInt(formDate.slice(5, 7)),
                d: parseInt(formDate.slice(8)),
            };

            console.log(formDate);
            // 如果月份+1 = 13 代表是1月
            if (todayDate.getMonth() + 1 === 13) {
                formSetDate.setM = 1;
            }

            // 檢查年份是否為過去
            if (dateData.y < todayDate.getFullYear()) {
                alert('日期不能是過去');
                return;
            }

            // 檢查輸入日期是否是過去
            if (dateData.m < todayDate.getMonth() + 1) {
                alert('日期不能是過去');
                return;
            } else if (dateData.m === todayDate.getMonth() + 1) {
                if (dateData.d < todayDate.getDate()) {
                    alert('日期不能是過去');
                    return;
                }
            }

            // !也許儲存成 mysql 時要使用 /n 格式
            // 取得內文 然後把 \n 替換成</br>
            const contentData = formContent.replace(/\r?\n/g, '<br>');

            // 包裝成object
            const box = [
                {id: idData},
                {itemShow: true}, // 刪除文章淡出
                {menu: false},
                {menuClass: 'closeItem'},
                {state: false}, // 預設false
                {stateImg: '/images/close.png'}, // 預設待辦
                {title: formTitle}, // 取得標題
                {content: contentData}, // 取得處裡過後的內容
                {setDate: `${formSetDate.setY}-${formSetDate.setM}-${formSetDate.setD}`},
                {date: formDate}, // 上傳格式 yyyy-mm-dd
            ];
            // console.log(box);

            const formData = new FormData();

            box.forEach(function (e) {
                const key = Object.keys(e);
                const value = Object.values(e);
                formData.append(key[0], value[0]);
            });

            axios({
                method: 'POST',
                url: this.axiosUrl,
                headers: {'Content-Type': 'multipart/form-data'},
                data: formData,
            })
                .then((e) => {
                    this.ajaxArticle(e.data);
                });


            // !用set方法推入陣列，然後依靠 v-for來更新
            // vm.$set(vm.articleDataArray, vm.articleDataArray.length, box);
            vm.closeEditArticle(); // 清空顯示區
        },

        //  關閉設定或添加文章區
        closeEditArticle: function () {
            const vm = this;
            // 將v-model的內容清空
            setTimeout(function () {
                vm.form.id = '';
                vm.form.title = '';
                vm.form.content = '';
                vm.form.date = '';
                vm.editArticleH2 = '添加代辦事項';
            }, 300);
            vm.articleForm = false; // 修改文章區關閉
            vm.form.edit = false; // 修改文章狀態false
        },

        /*
        *******************************其他功能*******************************
        */

        // 解析ajax取得的文章資料方法
        ajaxArticle: function (event) {
            const vm = this;
            const originalData = event.map(function (e) {
                // 解析資料型態
                e.itemShow = e.itemShow === 'true' ? true : false;
                e.menu = e.menu === 'true' ? true : false;
                e.state = e.state === 'true' ? true : false;
                e.setDate = {
                    setY: parseInt(e.setDate.slice(0, 4)),
                    setM: parseInt(e.setDate.slice(5, 7)),
                    setD: parseInt(e.setDate.slice(8)),
                };
                e.date = {
                    y: parseInt(e.date.slice(0, 4)),
                    m: parseInt(e.date.slice(5, 7)),
                    d: parseInt(e.date.slice(8)),
                };
                return e;
            });

            vm.articleDataArray = [];

            originalData.forEach(function (e) {
                vm.$set(vm.articleDataArray, vm.articleDataArray.length, e);
            });
        },
        // 產生uuid方法
        uuid: function () {
            let time = Date.now();

            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                time += performance.now();
            }

            // 回傳經過替換的 x 。 y要經過特殊處裡
            // x代表要被替換的每個字元
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, function (c) {
                    time = Math.floor(time / 16);
                    const random = (time + Math.random() * 16) % 16 | 0;

                    // 如果處裡的字串是x 回傳 random 。
                    // 如果是 y 回傳16位元數 0x3 or 0x8 相當於 3 or 8
                    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
                });
        },
    },

});
