import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import skillJson from './assets/skills.json';       // 匯入 json

import index from './index.vue'
import header from './components/header.vue'
import about from './components/about.vue'
import skills from './components/skills/skills.vue'
import App from './App.vue'



const store = createStore({
    state() {
        return {
            skillDatas: skillJson,
            skillPage: 2,
        }
    },
    getters: {

    },
    mutations: {
        CHENGE_SKILL_PAGE(state, payload) { //切換 技能頁面
            state.skillPage = payload
        }
    }
});

const routes = [
    {
        path: '/',
        component: header
    },
    {
        path: '/#header',
        component: header,
    },
    {
        path: '/#about',
        component: about,
    },
    {
        path: '/#skills',
        component: skills,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,					//也可以只寫 routes
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
    }
})

// router.beforeEach((to) => {
//     console.log(to);
// })

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')