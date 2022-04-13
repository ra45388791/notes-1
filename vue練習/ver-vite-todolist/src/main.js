import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import "./style/normalize.css"

import index from './index.vue'
import App from './App.vue'


const store = createStore({
    state() {
        return {

        }
    },
    getters: {
    },
    mutations: {
    }
});

const routes = [
    {
        path: '/',
        component: App,
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