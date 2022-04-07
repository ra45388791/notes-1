<template>
    <NavBox></NavBox>

    <router-view></router-view>
</template>

<script>

import NavBox from './components/navBox.vue'
import header from './components/header.vue'
export default {
    data() {
        return {

        };
    },
    components: { NavBox }
}



</script>

<style>
html {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 0;
    position: relative;
}
#app {
    margin-top: 0px !important;
}
</style>