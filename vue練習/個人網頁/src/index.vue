<template>
    <NavBox></NavBox>
    <div class="rightContent">
        <div>
            <Header></Header>
            <About></About>
            <Skills></Skills>
            <Work></Work>
        </div>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script>

import NavBox from './components/nav/navBox.vue'
import Header from './components/header.vue';
import About from './components/about.vue';
import Skills from './components/skills/skills.vue';
import Work from './components/work/work.vue';


export default {
    data() {
        return {

        };
    },
    components: { NavBox, Header, About, Skills, Work }
}



</script>

<style>
html {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth; /*平滑滾動 - 手機*/
}
body {
    position: relative;
    margin: 0;
    padding: 0;
}
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0;
}
#app {
    margin-top: 0px !important;
}

.rightContent {
    scroll-behavior: smooth; /*平滑滾動 - 電腦*/
}

@media (min-width: 1440px) {
    #app {
        display: flex;
    }
    .rightContent {
        overflow-y: scroll;
        width: 100%;
        height: 100vh;
        scroll-behavior: smooth;
    }
}
@media (min-width: 1920px) {
    body {
        margin: 0 20vw;
    }
    /* .rightContent {
        width: 45vw;
    } */
}
</style>