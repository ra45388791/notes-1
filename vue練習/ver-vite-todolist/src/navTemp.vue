<template>
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
</template>
<script>

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

}
</script>
<style scoped>
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
        height: 4.5rem;
        font-size: 2rem;
        text-align: start;
        line-height: 4.5rem;
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
</style>
