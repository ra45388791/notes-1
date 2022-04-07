<template>
    <NavBox></NavBox>
    <div class="rightContent">
        <Header></Header>
        <About></About>
    </div>
    <!-- <router-view></router-view> -->
</template>

<script>

import NavBox from './components/navBox.vue'
import Header from './components/header.vue';

import About from './components/about.vue';

export default {
    data() {
        return {

        };
    },
    components: { NavBox, Header, About }
}



</script>

<style>
html {
    margin: 0;
    padding: 0;
}
body {
    position: relative;
    margin: 0;
    padding: 0;
}
h2 {
    margin: 0;
}
#app {
    margin-top: 0px !important;
}

@media (min-width: 1440px) {
    .rightContent {
        position: absolute;
        right: 0;
        top: 0;
        width: 80vw;
    }
}
</style>