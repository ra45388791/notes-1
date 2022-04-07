<template>
    <div>User : {{ $route.params.id }}</div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$route.params);
        console.log(this.$router)
        console.log(this.$route);
    }

}

</script>