import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import "./style/normalize.css"
import skillJson from './assets/skills.json';       // 匯入 json

import index from './index.vue'
import mainPage from './components/mainPage/mainPage.vue'
import NotFound from './components/NotFound.vue'

// import App from './App.vue'



const store = createStore({
    state() {
        return {
            //技能頁面
            skillDatas: skillJson,
            skillPage: 0,
            skillFloatArticle: {
                id: '',
                image: {
                    url: '',
                    width: '',
                    height: ''
                },
                title: '',
                content: '',
            }
        }
    },
    getters: {
    },
    mutations: {
        CHENGE_SKILL_PAGE(state, payload) { //切換 技能頁面
            state.skillPage = payload
        },
        COMMIT_SKILL_ARTICLE(state, payload) {
            state.skillFloatArticle = {
                id: '',
                image: {
                    url: '',
                    width: '',
                    height: ''
                },
                title: '',
                content: '',
            };
            state.skillFloatArticle = {
                id: payload.id,
                image: {
                    url: payload.image.url,
                    width: payload.image.width,
                    height: payload.image.height
                },
                title: payload.title,
                content: payload.content,
            };
        }
    }
});

const routes = [
    {
        path: '/',
        component: mainPage
    },
    // {
    //     path: '/#about',
    //     component: about,
    // },
    // {
    //     path: '/#skills',
    //     component: skills,
    // },
    // {
    //     path: '/#work',
    //     component: work,
    // }
    {
        path: '/:pathMatch(.*)*',		// 要使用正則表達式	
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,					//也可以只寫 routes
    scrollBehavior(to, from, savedPosition) {
        if (to.fullPath === '/') {
            return {
                top: 0,
            }
        } else if (to.hash) {
            // console.log(to.hash);
            return {
                el: to.hash
            }
        }


    }
})

router.beforeEach((to, from) => {
    console.log(to);
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')