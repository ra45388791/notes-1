<template>
    <div class="mediaBox" ref="mediaBox">
        <div
            v-for="(photos, index) of photoId"
            :key="photos.id"
            v-show="showPhotoId === index"
            class="Box"
        >
            <img :src="photos.photo" alt />
        </div>
        <transition>
            <!-- ! 讀取 可能要在修改一下 -->
            <div v-show="photoId.length === 0" class="loading"></div>
        </transition>
        <div class="chengeButton">
            <button @click="reducePhoto"></button>
            <button @click="plusPhoto"></button>
        </div>
    </div>
</template>

<script>



/*
    貼文動態牆模組
    會有貼文內容 照片可以左右切換那種
*/
export default {
    /**
     * 要動到 worksJson 需要跟著修改以下組件
     *  work.vue
     *  workBox.vue
     *  WorkDynamicWall.vue
     *  WorkDynamicWallPhotoBox.vue
     * 
    */
    props: ['dynamicPhotos'],
    data() {
        return {
            showPhotoId: 0,
            photoId: []
        };
    },
    mounted() {
    },
    watch: {
        dynamicPhotos(newVal, oldVal) {
            const vm = this;
            this.photoId = [];
            this.showPhotoId = 0;
            setTimeout(() => {
                vm.photoId = newVal;

            }, 300)
        }
    },
    computed: {

    },
    methods: {
        plusPhoto: function () {
            if (this.photoId.length - 1 > this.showPhotoId) {
                this.showPhotoId += 1;
            } else {
                this.showPhotoId = 0;
            }
        },
        reducePhoto: function () {
            if (this.showPhotoId === 0) {
                //如果照片位置已經是 0 了 切換到最後一張
                this.showPhotoId = this.photoId.length - 1;
            } else {
                this.showPhotoId -= 1;
            }
        }
    }

}



</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.mediaBox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}

.Box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.Box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.chengeButton button {
    position: absolute;
    width: 3rem;
    height: 3rem;

    background: rgb(100, 100, 100);
    border: none;
    border-radius: 100%;
    opacity: 0.1;
    transition: 0.3s;
}

.chengeButton button:hover {
    opacity: 0.5;
}
.chengeButton button::before {
    position: absolute;
    left: 28%;
    top: 34%;
    content: "";
    width: 40%;
    height: 10%;
    background: #fff;
    border-radius: 30px;
    transform: rotate(-45deg);
}
.chengeButton button::after {
    position: absolute;
    left: 28%;
    top: 56%;
    content: "";
    width: 40%;
    height: 10%;
    background: #fff;
    border-radius: 30px;
    transform: rotate(45deg);
}
.chengeButton button:nth-child(1) {
    left: 1rem;
    top: calc(50% - 1.5rem);
}
.chengeButton button:nth-child(2) {
    right: 1rem;
    top: calc(50% - 1.5rem);
    transform: rotate(180deg);
}

.loading {
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    /* background: #000; */

    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid #fff;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;

    box-sizing: border-box;
    border-radius: 50px;
    animation: loadingAnimation 1s 0s infinite ease;
}

@keyframes loadingAnimation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>