<template>
    <div class="clockOuterFrame">
        <div class="commas d-flex flex-column justify-content-between" v-for="comma of 6">
            <div></div>
            <div></div>
        </div>
        <div class="pointer">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
}
</script>


<style scoped>
.clockOuterFrame {
    position: relative;
    width: 800px;
    height: 800px;
    background: rgb(255, 255, 255);
    border-radius: 100%;
}
.clockOuterFrame::before {
    content: "";
    position: absolute;
    left: calc(50% - 45%);
    top: calc(50% - 45%);
    width: 90%;
    height: 90%;
    background: rgb(10, 148, 190);
    border-radius: 100%;
}

.commas {
    position: absolute;
    left: calc(50% - 15px);
    top: calc(50% - 42.5%);
    width: 30px;
    height: 85%;
}
.commas > div {
    width: 30px;
    height: 30px;
    background: #000;

    border-radius: 100%;
}

.commas:nth-child(0) {
    transform: rotate(0deg);
}
.commas:nth-child(1) {
    transform: rotate(30deg);
}
.commas:nth-child(2) {
    transform: rotate(60deg);
}
.commas:nth-child(3) {
    transform: rotate(90deg);
}
.commas:nth-child(4) {
    transform: rotate(120deg);
}
.commas:nth-child(5) {
    transform: rotate(150deg);
}

.pointer {
    position: absolute;
    left: calc(50% - 2.5px);
    top: calc(50% - 2.5px);
    transform: rotate(180deg);
}
</style>