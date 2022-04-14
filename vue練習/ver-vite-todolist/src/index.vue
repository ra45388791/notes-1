<template>
    <div class="navBox">
        <Header v-show="UI.UIShow" />
        <NavTemp v-show="UI.UIShow" />
    </div>
    <FullArticle v-show="UI.articleShow" />

    <div id="indexContent">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";

import Header from './header.vue'
import NavTemp from './navTemp.vue';
import FullArticle from "./components/fullArticle.vue";


export default {
    data() {
        return {};
    },
    created() {
        //通知vuex 取得文章資料
        this.$store.dispatch('GET_BACKEND_ARTICLES');
    },
    computed: {
        ...mapState(['UI'])
    },
    components: { Header, NavTemp, FullArticle }
}
</script>
<style>
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
    z-index: 1;
}

#indexContent {
    position: relative;
    /* background: rgb(15, 5, 92); */
    z-index: 0;
}

@media (min-width: 1024px) {
    body {
        padding-top: 0px;
    }

    .navBox {
        position: fixed;
        left: 0;
        top: 0;
        width: 23rem;
        height: 100vh;
        background: #126376;
    }

    #indexContent {
        margin-left: 23rem;
    }
}

@media (min-width: 1440px) {

    .navBox {
        width: 30rem;
    }

    #indexContent {
        margin-left: 30rem;
    }
}
</style>
