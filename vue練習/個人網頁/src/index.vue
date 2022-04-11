<template>
    <!-- <NavBox></NavBox> -->
    <!-- <div class="rightContent">
        <Header></Header>
        <About></About>
        <Skills></Skills>
        <Work></Work>
    </div>-->
    <router-view></router-view>
</template>

<script>

// import NavBox from './components/mainPage/nav/navBox.vue'
// import Header from './components/mainPage/header.vue';
// import About from './components/mainPage/about.vue';
// import Skills from './components/mainPage/skills/skills.vue';
// import Work from './components/mainPage/work/work.vue';


export default {
    data() {
        return {

        };
    },
    // components: { NavBox, Header, About, Skills, Work }
}



</script>

<style>
html {
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
    /* 字體 */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */

    margin-top: 0px;
}
/*平滑滾動 - 電腦*/
/* .rightContent {
    scroll-behavior: smooth;
} */

@media (min-width: 1440px) {
    #app {
        display: flex;
    }
    /* .rightContent {
        overflow-y: scroll;
        width: 100%;
        height: 100vh;
        scroll-behavior: smooth;
    } */
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