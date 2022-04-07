<template>
    <nav>
        <router-view></router-view>
    </nav>
    <!-- <header></header> -->
    <div class="d-flex">
        <aside></aside>
        <main>
            <nav>adsaaaasdas</nav>
        </main>
    </div>
    <!-- <footer></footer> -->
</template>

<script>
export default {
    data() {
        return {

        }
    },


}
</script>

<style scoped>
nav {
    width: 100%;
    height: 5rem;
    background: #000;
}

aside {
    width: 8rem;
    height: auto;
    background: rgb(108, 108, 108);
}

main {
    width: 100%;
    height: 100vh;
    background: rgb(55, 55, 55);
}
</style>