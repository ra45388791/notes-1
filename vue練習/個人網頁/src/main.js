import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import index from './index.vue'
import header from './components/header.vue'
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
        path: '/',
        component: header,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes					//也可以只寫 routes
})

const vm = createApp(index);


vm.use(store);
vm.use(router);

vm.mount('#app')