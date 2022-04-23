import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'


import index from './index.vue'
import mainPage from './components/mainPage/mainPage.vue'




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
        component: mainPage
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
