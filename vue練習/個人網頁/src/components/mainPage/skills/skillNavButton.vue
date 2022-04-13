<template>
    <button type="button" @click="chengeSkillsArticle">{{ nameData }}</button>
</template>

<script>
export default {
    props: ['id', 'name', 'enName'],
    data() {
        return {
            idData: this.id,
            nameData: this.name,
            enNameData: this.enName,
        };
    },
    methods: {
        chengeSkillsArticle() {
            this.$emit('focusButton', this.idData);
        }
    }
}


</script>

<style scoped>
button {
    margin: 0 0.5rem;
    padding-top: 5px;
    height: 3rem;

    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;

    color: rgb(52, 52, 52);
    background-color: rgb(255, 255, 255);

    border: 2px solid rgb(0, 247, 255);
    border-radius: 30px;

    cursor: pointer;
    user-select: none; /*禁止區塊反白*/
    transition: background-color 0.4s, color 0.4s;
}

</style>