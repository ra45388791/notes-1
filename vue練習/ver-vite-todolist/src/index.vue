<template>
    <div class="navBox">
        <!-- <Header v-show="UI.UIShow" /> -->
        <Header />
        <NavTemp />
    </div>
    <!-- 文章功能 -->
    <FullArticle v-show="UI.articleShow" />
    <AddArticle v-show="UI.addArticle" />
    <EditArticle v-show="UI.editArticle" />

    <!-- 行事曆功能 -->
    <CalendarArticle v-show="calendarUI.calendarShow" />

    <div id="indexContent">
        <router-view></router-view>
        <transition name="mask">
            <div v-show="!UI.UIShow" @mouseup="CLOSE_ALL_FUNCTIONS" class="mask"></div>
        </transition>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import Header from './header.vue'
import NavTemp from './navTemp.vue';
import FullArticle from "./components/mainPage/fullArticle.vue";
import AddArticle from "./components/mainPage/addArticle.vue";
import EditArticle from "./components/mainPage/editArticle.vue";
import CalendarArticle from "./components/calendar/calendarArticle.vue";


export default {
    data() {
        return {};
    },
    created() {
        //通知vuex 取得文章資料
        this.$store.dispatch('GET_BACKEND_ARTICLES');
    },
    computed: {
        ...mapState({
            UI: 'UI',
            calendarUI: state => state.calendarDate.UI  //取 calendarDate 下的 UI
        })
    },
    methods: {
        ...mapMutations(['CLOSE_ALL_FUNCTIONS']),
    },
    components: { Header, NavTemp, FullArticle, AddArticle, EditArticle, CalendarArticle }
}
</script>
<style>
.mask-enter-active,
.mask-leave-active {
    transition: opacity 0.5s ease;
}

.mask-enter-from,
.mask-leave-to {
    opacity: 0;
}

.mask-enter-to,
.mask-leave-from {
    opacity: 1;
}



.editOrRead-enter-active,
.editOrRead-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.editOrRead-enter-from,
.editOrRead-leave-to {
    opacity: 0;
    transform: translateY(2rem);
}

.editOrRead-enter-to,
.editOrRead-leave-from {
    opacity: 1;
    transform: translateY(0rem);

}



body {
    position: relative;
    padding-top: 64px;
    padding-bottom: 64px;
    background: #0C4553;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    margin: 0;
    padding: 0;
    
}


.navBox {
    position: relative;
    /* z-index: 1; */
}

#indexContent {
    position: relative;
    /* background: rgb(15, 5, 92); */
    /* z-index: 100; */
}

.mask {

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;

}

@media (min-width: 768px) {
/* 
    .mask {
        display: block;
    } */
}


@media (min-width: 1024px) {
    body {
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .navBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 23rem;
        height: 100vh;
        background: #126376;
        box-shadow: 0 0px 10px -3px rgb(202, 255, 208);
    }

    #indexContent {
        margin-left: 23rem;
    }

    .mask {
        left: 23rem;

        width: calc(100% - 23rem);
    }
}

@media (min-width: 1440px) {

    .navBox {
        width: 30rem;
    }

    #indexContent {
        margin-left: 30rem;
    }

    .mask {
        left: 30rem;
        width: calc(100% - 30rem);
    }
}

@media (min-width:1920px) {

    .navBox {
        width: 30rem;
    }

    #indexContent {
        margin-left: 30rem;
    }

    .mask {
        left: 30rem;
        width: calc(100% - 30rem);
    }
}



/* 把免費空間自動加入的div隱藏起來 */
.disclaimer {
    display: none;
}
</style>
