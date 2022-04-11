import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import skillJson from './assets/skills.json';       // 匯入 json

import index from './index.vue'
import header from './components/header.vue'
import about from './components/about.vue'
import skills from './components/skills/skills.vue'
import work from './components/work/work.vue'

import App from './App.vue'



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
        component: header
    },
    // {
    //     path: '/#header',
    //     component: header,
    // },
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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,					//也可以只寫 routes
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
    }
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')