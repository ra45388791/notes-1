<template>
    <nav id="indexNav">
        <div class="title">
            <h1>coffee</h1>
        </div>
        <div class="navBox">
            <router-link to="adb">關於我們</router-link>>
            <router-link to="adb">精選咖啡</router-link>>
            <router-link to="adb">可口甜品</router-link>>
            <router-link to="adb">Q&amp;A</router-link>>
            <router-link to="adb">聯絡我們</router-link>>
        </div>
    </nav>
    <router-view></router-view>
    <footer>

    </footer>
</template>
<script>

</script>


<style >
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#indexNav {
    display: inline-flex;
}
</style>
