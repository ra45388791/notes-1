<template>
    <transition>
        <nav v-bind="$attrs" class="navBox">
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

    <!-- 添加文章按鈕 -->
    <transition name="addButtonAni">
        <button @mouseup="CHANGE_ADD_ARTICLE_STATE" v-show="UI.UIShow && page === 'root'" id="addButton"
            type="button"></button>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
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
    computed: {
        ...mapState({
            page: 'page',
            UI: 'UI'
        }),
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
        ...mapMutations(['CHANGE_ADD_ARTICLE_STATE', 'CHANGE_SHOW_ARTICLE']),
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

/* 添加文章按鈕動畫 */
.addButtonAni-enter-active {
    animation: addButtonAni 0.5s reverse;
}

.addButtonAni-leave-active {
    animation: addButtonAni 0.5s;
}

@keyframes addButtonAni {
    0% {
        transform: translateY(0px);
    }

    20% {
        transform: translateY(-1rem);
    }

    100% {
        transform: translateY(20rem);
        opacity: 0;
    }
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

/* 添加文章按鈕 */
#addButton {
    position: fixed;
    right: 2rem;
    bottom: 5rem;

    width: 3rem;
    height: 3rem;
    background: #00CFFF;
    border: none;
    border-radius: 100%;
    box-shadow: 0 5px 10px -5px #000;
    transition: 0.2s;
    z-index: 10;
}

#addButton:hover {

    box-shadow: 0 5px 10px -5px #000, inset 0 0 20px 0 #fff;
}


#addButton::before {
    content: "";
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 0.15rem);
    width: 2rem;
    height: 0.3rem;
    background: #fff;
}

#addButton::after {
    content: "";
    position: absolute;
    left: calc(50% - 0.15rem);
    top: calc(50% - 1rem);
    width: 0.3rem;
    height: 2rem;
    background: #fff;
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

    /* 添加文章按鈕 */
    #addButton {

        left: 5.5rem;
        bottom: 1.5rem;

        width: 12rem;
        height: 3rem;

        border-radius: 30px;
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

    /* 添加文章按鈕 */
    #addButton {
        left: 9rem;
        bottom: 1.5rem;

        width: 12rem;
        height: 3rem;
    }
}

@media (min-width:1920px) {
    .buttonMenu button {
        position: relative;
        width: 100%;
        height: 6rem;
        font-size: 3rem;
        text-align: start;
        line-height: 6.5rem;
        box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.251);

    }

    /* 添加文章按鈕 */
    #addButton {
        left: 11rem;
        bottom: 1.5rem;

        width: 18rem;
        height: 5rem;
        border-radius: 80px;
    }

    #addButton::before {
        left: calc(50% - 1.75rem);
        top: calc(50% - 0.3rem);
        width: 3.5rem;
        height: 0.6rem;
    }

    #addButton::after {
        content: "";
        position: absolute;
        left: calc(50% - 0.3rem);
        top: calc(50% - 1.75rem);
        width: 0.6rem;
        height: 3.5rem;
        background: #fff;
    }


}
</style>
