<template>
    <nav
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseLeave"
        @mouseleave="mouseLeave"
        ref="scrollBar"
    >
        <!-- <button
            v-for=" btn of buttonData"
            @click="changeHref(btn.href)"
            class="bottomBtn"
            formtarget="_blank"
        >
            <img :src="btn.image" alt />
        </button>-->
        <a v-for=" btn of buttonData" :href="btn.href" class="bottomBtn" target="_blank">
            <img :src="btn.image" alt />
        </a>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isMouseDown: false,
            pos: {
                left: 0,
                x: 0
            },
            buttonFocus: NaN,
            buttonData: [
                {
                    id: 0,
                    image: '../../../public/nav/git_hub.png',
                    href: "https://github.com/ra45388791"
                },
                {
                    id: 1,
                    image: '../../../public/nav/104.png',
                    href: "https://pda.104.com.tw/profile/share/6OFojacTKtUXHsRI7QsUq24EJikVOmze"
                }
            ]
        };
    },
    computed: {

    },
    methods: {
        // 處裡使用者拖曳事件
        mouseDown: function (e) {
            this.isMouseDown = true;
            this.$refs.scrollBar.style.cursor = "grabbing"
            this.pos.left = this.$refs.scrollBar.scrollLeft;
            this.pos.x = e.clientX;
        },
        mouseMove: function (e) {

            const dx = e.clientX - this.pos.x;
            if (this.isMouseDown) {
                this.$refs.scrollBar.scrollLeft = this.pos.left - dx;
            }
        },
        mouseLeave: function (e) {
            this.$refs.scrollBar.style.cursor = "grab"
            this.isMouseDown = false
        },
        // 連結外部網址
        changeHref(e) {
            window.location.href = e
        }

    },

}



</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1rem auto;
    width: 100%;

    height: 4rem;
    background: rgb(128, 128, 128);
    border: 4px solid rgb(220, 220, 220);
    box-sizing: border-box;
    border-radius: 50px;
    overflow: scroll;
    cursor: grab;
}
nav::-webkit-scrollbar {
    display: none;
}

.bottomBtn {
    margin: 0 1rem;
    padding: 0;
    min-width: 2.5rem;
    height: 2.5rem;

    background-color: rgb(255, 255, 255);

    border: 4px solid rgb(209, 209, 209);
    border-radius: 30px;
    box-shadow: 0 0 0px 0 #000;

    cursor: pointer;
    user-select: none; /*禁止區塊反白*/
    transition: all 0.2s;
}

.bottomBtn img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
}

.bottomBtn:hover {
    color: white;
    border: 4px solid rgb(175, 175, 175);
    box-shadow: 0 0 5px 0 rgb(254, 254, 254);
}
.bottomBtn:focus {
    color: white;
    border: 4px solid rgb(175, 175, 175);
    box-shadow: 0 0 10px 0 rgb(254, 254, 254);
}
</style>