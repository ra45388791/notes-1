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
 * 新增貼文功能         (標題 / 內文 / 日期)
 * 修改貼文
 * 代辦 / 結案 / 修改 / 刪除
 * 行事曆
 * 讀取畫面
 */
const url = 'https://tranquil-gorge-87619.herokuapp.com/';


const store = createStore({
    state() {
        return {
            mainArticles: [],
            UI: {
                UIShow: true, // 介面顯示
                articleShow: false, // 完整文章淡入
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
                state.mainArticles = payload;
            }
        },
        //開啟全文章
        OPEN_FULL_ARTICLES(state) {
            state.UI.UIShow = !state.UI.UIShow;
            state.UI.articleShow = !state.UI.articleShow;
        },
        //把文章推入暫存state以操作閱讀/編輯/新增
        TEMPORARY_STORAGE_ARTICLES(state, payload) {
            state.temporaryStorageArticle = {}
            state.temporaryStorageArticle = payload
        }
    },
    actions: {
        //取得初始主資料
        async GET_BACKEND_ARTICLES(context) {
            try {
                const article = await axios.get(url)
                context.commit('SET_MAIN_ARTICLES', article.data);

            } catch (err) {
                throw Error(err);
            }
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