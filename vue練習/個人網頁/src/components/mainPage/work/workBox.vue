<template>
    <div class="workBox">
        <button class="content" @mouseup="openArticle">
            <img :src="image" :style="showMask ? 'transform: scale(1.1);' : ''" />
            <div
                class="mask"
                :style="showMask ? 'opacity: 1;' : 'opacity: 0;'"
                @mouseover="mouseIn"
                @mouseout="mouseOut"
            >
                <h3>{{ title }}</h3>
            </div>
        </button>
    </div>
</template>

<script>
/**
 * 要動到 worksJson 需要跟著修改以下組件
 *  work.vue
 *  workBox.vue
 *  WorkDynamicWall.vue
 *  WorkDynamicWallPhotoBox.vue
 * 
*/
export default {
    props: ["id", "title", "content", "image", "photos", "button"],
    data() {
        return {
            showMask: false,
        };
    },
    mounted() {
        // console.log(this.image);
    },
    computed: {},
    methods: {
        openArticle() { //開啟文章
            const box = {
                id: this.id,
                title: this.title,
                content: this.content,
                image: this.image,
                photos: this.photos,
                button: this.button,
            }

            this.$emit('openArticle', box);
        },
        mouseIn() {
            this.showMask = true;
        },
        mouseOut() {
            this.showMask = false;
        }
    },

}
</script>

<style scoped>
.workBox {
    position: relative;
    margin: 0;
    width: 18rem;
    height: 18rem;
}
.workBox .content {
    position: relative;
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
    overflow: hidden;
}
.workBox img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s;
}
.workBox .content .mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.52);
    color: #fff;
    transition: 0.3s;
    z-index: 2;
    cursor: pointer;
}
</style>