<template>
    <transition>
        <div v-show="UI.loading" id="loading">
            <div class="loadingBox">

                <div class="loadingImage">
                    <img src="/images/notebook.gif" alt="">
                </div>
                <div class="loadingText">
                    <p>{{ loadingText }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from "vuex";


export default {
    data() {
        return {
            loadingText: 'Loading...'
        }
    },
    computed: {
        ...mapState(['UI']),
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

#loading {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    z-index: 10;
}

.loadingBox {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 10rem;
    /* background: #000; */
}

.loadingImage {
    width: 100px;
    height: auto;
    animation: loading 0.65s ease-in-out infinite;
}

.loadingImage img {
    width: 100%;
    height: 100%;
}

.loadingText {
    color: #fff;
}

.loadingText p {
    margin: 0;
    margin-top: 0.3rem;
    font-size: 28px;
    font-weight: 900;
}


@keyframes loading {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
}

@media (min-width: 1024px) {
    #loading {
        margin-left: 23rem;
        width: calc(100% - 23rem);
    }
}
</style>