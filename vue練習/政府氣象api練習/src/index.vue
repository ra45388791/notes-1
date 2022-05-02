<template>
    <nav id="indexNav">
        <div class="title">
            <a href="/">
                <h1>天氣預報平台</h1>
            </a>
        </div>
        <div class="navBox">
            <router-link to="/">首頁</router-link>
            <router-link to="weatherPage">天氣預報</router-link>
        </div>
    </nav>
    <router-view></router-view>
    <footer>
        <p>本網站僅作為應徵用</p>
    </footer>
</template>
<script>
export default {


}

</script>

<style>
/* 幻燈片 */
.photoIn {
    animation: photoIn 2s ease forwards;
}

.photoOut {
    animation: photoOut 2s ease forwards;
}

@keyframes photoIn {
    0% {
        /* transform: translateX(100vw); */
        opacity: 0;
    }

    100% {
        opacity: 1;
        /* transform: translateX(0); */
    }
}

@keyframes photoOut {
    0% {
        opacity: 1;
        /* transform: translateX(0); */
    }

    100% {
        opacity: 0;
        /* transform: translateX(-100vw); */
    }
}


*,
::after,
::before {
    box-sizing: border-box;
}

html {
    margin: 0;
    padding: 0;
}

body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
}

.router-link-active {
    /* box-shadow: inset 0 -5px 0 0 rgb(158, 158, 158); */

    box-shadow: inset 0 -3px 0 0 rgb(81, 255, 0);
}


#indexNav {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0 2rem;

    height: 5rem;

    /* background: rgb(254, 254, 254); */
    background: rgb(0, 106, 255);


    /* border-bottom: 5px solid rgb(202, 202, 202); */
    border-bottom: 5px solid rgb(0, 149, 255);
}

#indexNav a {
    display: inline-block;
    padding: 0 0.5rem;

    text-decoration: none;
}



#indexNav a:visited {
    color: #000;
}

#indexNav .title {
    display: inline-block;
    width: 100%;

    text-align: center;
}

#indexNav .title h1 {
    margin: 0;

    color: #fff;

}

#indexNav .navBox {

    width: 100%;
    /* height: 2rem; */
    text-align: center;
}

#indexNav .navBox a {
    padding-bottom: 5px;
    color: #fff;
    /* border-left: 2px solid rgb(64, 64, 64); */
}

#indexNav .navBox a:nth-last-child(1) {
    /* border-right: 2px solid rgb(64, 64, 64); */
}


footer {
    margin: 0;
    padding: 0;
    height: 3rem;
    background: rgb(44, 44, 44)
}

footer p {
    margin: 0;
    padding: 0;
    line-height: 3rem;
    text-align: center;
    /* color: rgb(110, 110, 110); */
    color: rgb(110, 110, 110);
}

/* 隱藏平台自動加入標籤 */
.disclaimer {
    display: none;
}
</style>
