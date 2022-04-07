<template>
    <h1>vue 路由</h1>
    <p>
        <router-link to="/">Go to Home</router-link>|
        <router-link to="/main">Go to main</router-link>
        <router-link to="/main/user">Go to main</router-link>
    </p>

    <router-view></router-view>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.params);
    }

}

</script>

<style scoped>
.router-link-active {
    background: #000;
}
</style>