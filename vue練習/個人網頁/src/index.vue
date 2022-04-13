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
/* 模組化動畫css */
@keyframes topFadeIn {
    0% {
        opacity: 0;
        transform: translateY(-2rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0rem);
    }
}

@keyframes bottomFadeIn {

    /* 從底部fadein */
    0% {
        opacity: 0;
        transform: translateY(2rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0rem);
    }
}

@keyframes leftFadeIn {

    /* 從底部fadein */
    0% {
        opacity: 0;
        transform: translateX(-2rem);
    }

    100% {
        opacity: 1;
        transform: translateX(0rem);
    }
}

@keyframes rightFadeIn {

    /* 從底部fadein */
    0% {
        opacity: 0;
        transform: translateX(2rem);
    }

    100% {
        opacity: 1;
        transform: translateX(0rem);
    }
}

/* header方塊動畫 */
@keyframes squareRightFadeIn {
    0% {
        opacity: 0;
        transform: translateX(5rem);
    }

    100% {
        opacity: 1;
        transform: translateX(0rem);
    }
}


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

@media (min-width: 425px) {
    /* header方塊動畫 */
    @keyframes squareRightFadeIn {
        0% {
            opacity: 0;
            transform: translateX(10rem);
        }

        100% {
            opacity: 1;
            transform: translateX(0rem);
        }
    }



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