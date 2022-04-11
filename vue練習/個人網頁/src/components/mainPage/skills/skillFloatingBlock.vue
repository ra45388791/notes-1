<template>
    <transition>
        <div class="floatBoxBackground" @click.self="closeArticle" v-show="active">
            <div class="floatBox">
                <div class="header">
                    <div :style="imageSize">
                        <img :src="openArticle.image.url" alt />
                    </div>
                    <h3>{{ openArticle.title }}</h3>
                </div>
                <div class="content">
                    <p>{{ openArticle.content }}</p>
                </div>
                <div class="closeArticle">
                    <button type="button" @click.self="closeArticle"></button>
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
            active: false,
            imageSize: {
                width: 0,
                height: 0
            }
        };
    },
    computed: {
        ...mapState(['skillFloatArticle']),
        openArticle() {
            if (this.skillFloatArticle.id) {
                this.active = true
            }
            this.imageSize.width = this.skillFloatArticle.image.width + 'px';
            this.imageSize.height = this.skillFloatArticle.image.height + 'px';
            return this.skillFloatArticle;
        }
    },
    methods: {
        closeArticle(e) {
            this.active = false;
        }

    },
    components: {}
}



</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.floatBoxBackground {
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    /* left: calc(50% - 40%);
    top: calc(50% - 40%); */
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.615);
    z-index: 1;
}

.floatBox {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 80vw;
    height: 50vh;
    min-height: 339.5px;

    background: rgb(255, 255, 255);
    border: 4px solid rgb(0, 225, 255);
    border-radius: 30px;
}
.floatBox img {
    width: 100%;
    height: 100%;
}

.header {
    margin-top: 2rem;
}
.header > div {
    margin: 0 auto;
}
.header h3 {
    padding-bottom: 0.3rem;
    border-bottom: 3px solid #000;
}
.content {
    margin: 0 1rem;
    text-align: center;
}
.closeArticle {
    position: absolute;
    width: 5rem;
    height: 0rem;
    bottom: 0;
    left: calc(50% - (30px + 2.5rem));

    border-top: 0px solid rgba(0, 225, 255, 0);
    border-bottom: 50px solid rgb(0, 225, 255);
    border-left: 30px solid rgba(0, 225, 255, 0);
    border-right: 30px solid rgba(0, 225, 255, 0);
}

.closeArticle button {
    position: absolute;
    left: calc(50% - 1.25rem);
    bottom: -2.9rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 100%;
    transform: rotate(45deg);
    cursor: pointer;
    transition: 0.5s;
}
.closeArticle button::before {
    content: "";
    position: absolute;
    left: calc(50% - 40%);
    top: calc(50% - 10%);
    width: 80%;
    height: 20%;
    background: rgb(0, 225, 255);
}
.closeArticle button::after {
    content: "";
    position: absolute;
    left: calc(50% - 10%);
    top: calc(50% - 40%);
    width: 20%;
    height: 80%;
    background: rgb(0, 225, 255);
}
.closeArticle button:hover {
    background-color: rgb(119, 119, 119);
}

@media (min-width: 768px) {
    .floatBox {
        flex-direction: row;
        justify-content: center;
        /* align-items: center; */
        width: 30rem;
        height: 15rem;
        min-height: 0;
        /* min-height: 339.5px; */

        /* background: rgb(255, 255, 255);
    border: 4px solid rgb(0, 225, 255);
    border-radius: 30px; */
    }
    .header {
        position: relative;
        margin-top: 0rem;
        margin: 0 2rem;
    }
    .header::before {
        content: "";
        position: absolute;
        right: -35px;
        top: calc(50% - 5rem);

        height: 10rem;
        border: 2px solid rgb(0, 225, 255);
        border-radius: 30px;
    }
    .content {
        margin: 0 1rem;
        width: 100%;
        text-align: start;
        text-indent: 2rem;
    }
}
</style>