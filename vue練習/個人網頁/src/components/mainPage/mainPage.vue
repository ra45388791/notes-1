<template>
    

    <div class="rightContent">
        <Header></Header>
        <About></About>
        <Skills></Skills>
        <Work></Work>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script>

import NavBox from './nav/navBox.vue'
import Header from './header.vue';
import About from './about.vue';
import Skills from './skills/skills.vue';
import Work from './work/work.vue';


export default {
    data() {
        return {

        };
    },
    components: { NavBox, Header, About, Skills, Work }
}



</script>

<style scoped>

.rightContent {
    scroll-behavior: smooth; /*平滑滾動 - 電腦*/
}

@media (min-width: 1440px) {

    .rightContent {
        overflow-y: scroll;
        width: 100%;
        height: 100vh;
        scroll-behavior: smooth;
    }
}
@media (min-width: 1920px) {

    /* .rightContent {
        width: 45vw;
    } */
}
</style>