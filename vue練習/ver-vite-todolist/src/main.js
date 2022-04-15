import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

import "./style/normalize.css"

import index from './index.vue'
import mainPage from './components/mainPage.vue'

/**
 * !貼文
 * !檢視貼文功能
 * !新增貼文功能         (標題 / 內文 / 日期)
 * 代辦 / 結案 / 修改 / 刪除
 * 修改貼文
 * 行事曆
 * !讀取畫面
 */
// const url = 'https://tranquil-gorge-87619.herokuapp.com/';
const url = 'http://localhost:5000/#/';


const store = createStore({
    state() {
        return {
            mainArticles: [],
            UI: {
                UIShow: true,       // 介面顯示
                loading: false,      //
                articleShow: false, // 閱讀完整文章淡入
                addArticle: false,  // 新增文章淡入
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
        //將初始主資料推入state
        SET_MAIN_ARTICLES(state, payload) {
            if (Array.isArray(payload)) {
                state.mainArticles = []
                state.mainArticles = payload;
            }
        },
        //開啟全文章
        CHANGE_SHOW_ARTICLE_STATE(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.articleShow = !state.UI.articleShow;
        },
        //開啟新增文章編輯器
        CHANGE_ADD_ARTICLE_STATE(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.addArticle = !state.UI.addArticle;
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
            state.temporaryStorageArticle = {
                id: '',
                title: '',
                content: '',
                setDate: '',
                date: '',
                state: '',
                stateImg: ''
            }
        },
        //讀取畫面
        CHANGE_LOADING(state) {
            state.UI.loading = !state.UI.loading;
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
                return true;
            }).catch((err) => {
                return false;   //失敗時回傳 false 並跳出失敗提示
            });

            //!讀取畫面關
            context.commit('CHANGE_LOADING');
            return isSuccess    //回傳是否成功
        }
    }
});

const routes = [
    {
        path: '/',
        component: mainPage,
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
    console.log(to);
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')