<template>
    <li>
        <router-link class="navButton" :to="buttonAnchor">{{ buttonName }}</router-link>
        <!-- <a class="navButton" :href="buttonAnchor">{{ buttonName }}</a> -->
    </li>
</template>

<script>
export default {
    props: ['named', 'Anchord', 'idd'],
    data() {
        return {
            buttonName: this.named,
            buttonAnchor: this.Anchord,
            id: this.idd,
        }
    },
    mounted() {

    }


}
</script>

<style scoped>
li {
    margin: 0.8rem 0;
    list-style: none;
}

a {
    position: relative;
    padding-bottom: 2px;
    font-size: 1.2rem;
    text-decoration: none;
    border: none;
    background: rgba(0, 0, 0, 0);
    color: rgb(206, 206, 206);
    /* box-shadow: 0 0px 0 0 #fff; */
    /* transition: 0.3s; */
}
a::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 2px;
    background: rgb(229, 229, 229);
    transition: all 0.3s;
}

a:hover::after {
    left: 0;
    width: 100%;
}
</style>