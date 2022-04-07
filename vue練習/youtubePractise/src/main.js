// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.runtime.esm-bundler'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

import routerIndex from './routerIndex.vue'
import App from './components/App.vue'
import main from './components/main.vue'
import User from './components/user.vue'
import Error from './components/Error.vue'


//vuex
const moduleA = {
    state() {
        return {
            count: 5
        }
    }
}
const moduleB = {
    state() {
        return {
            count: 2
        }
    },
    getters: {
        GETTER_COUNT(state, getters, rootState) {
            // console.log(rootState);
            return state.count += rootState.moduleA.count;
        }
    }
}

const store = createStore({
    state() {
        return {
            count: 23,
            count2: 57,
            title: '我是標題',
            content: '我是內容',
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    getters: {
        oddComputed(state) {
            // console.log(state);
            return state.array.filter(e => e % 2 !== 0);
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        plusCount(state, count) {
            state.count += count;
        }
    },
    actions: {
        async SET_COUNT({ dispatch, commit, state }) {
            await dispatch('SET_COUNTB');
            return new Promise((resolve, reject) => {
                commit('increment', { count: state.count + 1 })
                console.log(state);
                resolve(state.count)
            })
        },
        // SET_COUNTB({ dispatch, commit, state }) {
        SET_COUNTB(context, payload) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    console.log('成功');
                    resolve('成功')
                }, 2000)
            })
        }
    },
    modules: {
        moduleA: moduleA,
        moduleB: moduleB,
    }

})


const routes = [
    {
        path: '/',
        component: App,

    },
    {
        path: '/main',
        component: main,
        children: [
            {
                // 當 /user/:id/profile 匹配成功 
                // UserProfile 將被渲染到 User 的 <router-view> 內部
                path: 'user',
                component: User
            }
        ]
    },
    {
        path: '/users/:id(\\d+)',
        component: User
    },
    {
        path: '/:pathMatch(.*)*',
        component: Error
    },
]

// vue-router
const router = createRouter({

    history: createWebHashHistory(),
    routes: routes,
})



// const app = createApp(App);
const app = createApp(routerIndex); // 掛載使用 router 的組件


app.use(store);
app.use(router);


app.mount('#app');

