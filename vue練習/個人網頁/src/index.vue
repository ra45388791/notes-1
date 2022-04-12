<template>
    <NavBox></NavBox>
    <!-- <div class="rightContent">
        <Header></Header>
        <About></About>
        <Skills></Skills>
        <Work></Work>
    </div>-->
    <div class="contentBox">
        <router-view></router-view>
        <FooterTemp></FooterTemp>
    </div>

</template>

<script>

import NavBox from './components/mainPage/nav/navBox.vue'
import FooterTemp from './components/footer/footerTemp.vue'



export default {
    data() {
        return {

        };
    },
    // components: { NavBox, Header, About, Skills, Work }
    components: { NavBox, FooterTemp }

}



</script>

<style>
html {
    padding: 0;
    scroll-behavior: smooth;
    /*平滑滾動 - 手機*/
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

    margin-top: 0px;
}

.contentBox {
    width: 100vw;
    height: 100%;
}

@media (min-width: 1440px) {
    #app {
        display: flex;
    }

    .contentBox {
        margin-left: 15vw;
        width: 85vw;
        height: 100%;
    }
}

@media (min-width: 2000px) {
    body {
        margin: 0 15vw;
    }
}
</style>