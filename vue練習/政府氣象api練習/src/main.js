import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'


import index from './index.vue'





const store = createStore({
    state() {
        return {

        }
    },
    getters: {},
    mutations: {},
    actions: {}
})

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: () => import('./components/mainPage/mainPage.vue')
    },
    {
        path: '/weatherPage',
        name: 'weatherPage',
        component: () => import('./components/weatherPage/weatherPage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach(() => {

})

const vm = createApp(index);

vm.use(store);
vm.use(router);

vm.mount('#app')
