<template>
    <transition>
        <nav class="navBox">
            <div class="buttonMenu">
                <button v-for="btn of buttonData" :key="btn.id"
                    :class="appliedArea === btn.id ? 'menuClick' : 'menuUnclick'">
                    <input type="radio" v-model="appliedArea" :id="btn.id" :value="btn.id">
                    <label :for="btn.id">
                        {{ btn.name }}
                    </label>
                </button>
            </div>
        </nav>
    </transition>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            appliedArea: 'allItem', //判斷該顯示哪一種畫面
            buttonData: [
                {
                    id: 'allItem',
                    name: '所有事項'
                },
                {
                    id: 'toDo',
                    name: '待辦'
                },
                {
                    id: 'getThingsDone',
                    name: '結案'
                },
                {
                    id: 'calendar',
                    name: '行事曆'
                },
            ]
        }
    },
    watch: {
        appliedArea(newVal, oldVal) {
            //路由 : 取得目前所在頁面
            const currentPage = this.$router.currentRoute._value.path;

            //搜尋參數中是否有文章頁關鍵字 有:回傳0 沒有:回傳-1
            const rootPathSearch = /allItem|toDo|getThingsDone/g
            const rootPath = newVal.search(rootPathSearch)

            //搜尋參數中是否有行事曆頁關鍵字 有:回傳0 沒有:回傳-1
            const calendarPathSearch = /calendar/g
            const calendarPath = newVal.search(calendarPathSearch)


            if (currentPage !== '/' && rootPath === 0) {
                //如果目前頁面不在根目錄  而點選的是根目錄按鈕 前往文章頁
                this.$router.push('/')
            } else if (calendarPath === 0) {
                //如果目前在文章頁  而點選的是行事曆頁 前往行事曆頁
                this.$router.push('/calender')
            }

            this.CHANGE_SHOW_ARTICLE(newVal);
        }
    },
    methods: {
        ...mapMutations(['CHANGE_SHOW_ARTICLE']),
    }


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

.navBox {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    background: #1BAACB;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;
}

.buttonMenu button {
    position: relative;
    padding: 0;
    width: 25%;

    font-size: 1.2rem;
    font-weight: bold;

    line-height: 3.5rem;


    border: 0;
    transition: background-color 0.4s, color 0.4s;
}

.buttonMenu button input {
    position: absolute;
    visibility: hidden;
}

.buttonMenu button label {
    display: block;
    width: 100%;
    height: 100%;
}

.buttonMenu button:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: calc(50% - 1.25rem);
    width: 1px;
    height: 2.5rem;
    border-radius: 100px;
    background: rgb(255, 255, 255);
}

.menuUnclick {
    background: #1BAACB;
    color: #FFFFFF;
}

.menuClick {
    color: #15778f;
    background: #65e3ff;
}


@media (min-width:1024px) {

    .navBox {
        position: relative;
        width: 100%;
        height: auto;
        background: #1BAACB;
        box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    }

    .buttonMenu button {
        position: relative;
        width: 100%;
        height: 3rem;
        font-size: 1.5rem;
        text-align: start;
        line-height: 3.5rem;
        box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.251);
    }

    .buttonMenu button label {
        padding-left: 2rem;
    }

    .buttonMenu button:not(:first-child)::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 0px;
    }

}

@media (min-width:1440px) {

    .buttonMenu button {
        position: relative;
        width: 100%;
        height: 4.5rem;
        font-size: 2rem;
        text-align: start;
        line-height: 4.5rem;
        box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.251);

    }
}
</style>
