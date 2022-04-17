import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

import "./style/normalize.css"

import index from './index.vue'
import mainPage from './components/mainPage/mainPage.vue'
import calenderMainPage from './components/calendar/calenderMainPage.vue'

/**
 * !貼文
 * !檢視貼文功能
 * !新增貼文功能         (標題 / 內文 / 日期)
 * !代辦 / 結案 / 修改 
 * !修改貼文
 * !讀取畫面
 * !刪除文章 ( 刪除時檢查清單是否完成 )
 * 行事曆
 */
const url = 'https://tranquil-gorge-87619.herokuapp.com/';
// const url = 'http://localhost:5000/#/';


const store = createStore({
    state() {
        return {
            page: '',
            mainArticles: [],
            showStateArticle: 'allItem',
            UI: {
                UIShow: true,       // 介面顯示
                loading: false,     // loading 畫面
                articleShow: false, // 閱讀完整文章淡入
                addArticle: false,  // 新增文章淡入
                editArticle: false, // 編輯文章淡入
                hint: {
                    success: false,
                    fail: false
                }
            },
            temporaryStorageArticle: {
                id: '',
                title: '',
                content: '',
                setDate: '',
                date: '',
                state: '',
                stateImg: ''
            },
        }
    },
    getters: {
    },
    mutations: {
        IS_ROOT_PAGE(state, payload) {
            state.page = payload
        },
        //將初始主資料推入state
        SET_MAIN_ARTICLES(state, payload) {
            if (Array.isArray(payload)) {
                state.mainArticles = []
                state.mainArticles = payload;
            }
        },
        //切換顯示狀態文章
        CHANGE_SHOW_ARTICLE(state, payload) {
            state.showStateArticle = payload;
        },
        //開啟全文章
        CHANGE_SHOW_FULL_ARTICLE_STATE(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.articleShow = !state.UI.articleShow;
        },
        //開啟  "  新增  "  文章編輯器
        CHANGE_ADD_ARTICLE_STATE(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.addArticle = !state.UI.addArticle;
        },
        //開啟  "  編輯  "  文章編輯器
        CHANGE_EDIT_ARTICLE_STATE(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.editArticle = !state.UI.editArticle;
        },
        //把文章推入暫存state以操作閱讀/編輯/新增
        TEMPORARY_STORAGE_ARTICLES(state, payload) {
            state.temporaryStorageArticle = {}
            state.temporaryStorageArticle = payload

        },
        //關閉所有功能&清空暫存文章區
        CLOSE_ALL_FUNCTIONS(state) {

            state.UI.UIShow = true;             //UI介面
            state.UI.articleShow = false;       //閱讀文章
            state.UI.addArticle = false;        //添加文章      
            state.UI.editArticle = false;        //添加文章      
            setTimeout(() => {
                state.temporaryStorageArticle = {
                    id: '',
                    title: '',
                    content: '',
                    setDate: '',
                    date: '',
                    state: '',
                    stateImg: ''
                }
            }, 400)
        },
        //讀取畫面
        CHANGE_LOADING(state) {
            state.UI.loading = !state.UI.loading;
        },
        //操作成功提示
        SUCCESS_TIPS(state) {
            state.UI.hint.success = true;
            setTimeout(function () {
                state.UI.hint.success = false;
            }, 1300)
        },
        FAIL_TIPS(state) {
            state.UI.hint.fail = true;
            setTimeout(function () {
                state.UI.hint.fail = false;
            }, 1300)
        }
    },
    actions: {
        //取得初始主資料
        async GET_BACKEND_ARTICLES(context) {
            try {
                context.commit('CHANGE_LOADING');

                const article = await axios.get(url)
                context.commit('SET_MAIN_ARTICLES', article.data);

                context.commit('CHANGE_LOADING');
            } catch (err) {
                throw Error(err);
            }
        },
        async SUBMIT_ARTICLES(context, payload) {
            //關閉所有功能視窗
            context.commit('CLOSE_ALL_FUNCTIONS');
            //!讀取畫面開
            context.commit('CHANGE_LOADING');

            const isSuccess = await axios({
                method: payload.method,
                url: url,
                data: {
                    func: payload.func,         //後端接口判斷用方法名稱
                    data: payload.data,         //主資料
                }
            }).then((response) => {
                //推上主資料
                context.commit('SET_MAIN_ARTICLES', response.data);
                context.commit('SUCCESS_TIPS'); //操作成功提示
                return true;
            }).catch((err) => {
                context.commit('FAIL_TIPS');    //操作失敗提示
                return false;   //失敗時回傳 false 並跳出失敗提示
            });

            //!讀取畫面關
            context.commit('CHANGE_LOADING');
            return isSuccess    //回傳是否成功
        },

    }
});

const routes = [
    {
        path: '/',
        component: mainPage,
    },
    {
        path: '/calender',
        component: calenderMainPage,
    },
    // {
    //     path: '/:pathMatch(.*)*',		// 要使用正則表達式	
    //     component: NotFound
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,					        //也可以只寫 routes
})

router.beforeEach((to, from) => {
    //取得前往的網址
    const getPath = to.path.slice(1);   //去掉 斜線 /
    if (getPath) {                      //如果有內容修改page狀態為 前往網頁的名稱
        store.commit('IS_ROOT_PAGE', getPath)
    } else {                            //如果沒內容代表是根目錄
        store.commit('IS_ROOT_PAGE', 'root')
    }
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')