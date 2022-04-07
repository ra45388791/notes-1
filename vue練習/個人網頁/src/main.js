import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import index from './index.vue'
import header from './components/header.vue'
import about from './components/about.vue'
import App from './App.vue'



const store = createStore({
    state() {
        return {
            count: 0
        }
    }
});

const routes = [
    {
        path: '/#header',
        component: header,
    },
    {
        path: '/#about',
        component: about,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,					//也可以只寫 routes
    scrollBehavior(to, from, savedPosition) {
        console.log(to);
        if (to.hash) {
            return {
                el: to.hash
            }
        }
    }
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')