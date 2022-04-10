<template>
    <nav class="indexNav" :class="navState ? 'openNav' : 'closeNav'">
        <button type="button" @click="showNav" class="showNav"></button>
        <div>
            <div class="photoStickers">
                <img :src="photoStickers" class alt srcset />
                <h2>{{ navSelfIntroductionH2 }}</h2>
                <p>{{ navSelfIntroductionP }}</p>
            </div>
            <div class="navOptions">
                <ul>
                    <navButton
                        v-for="navbutton of navOptions"
                        :named="navbutton.name"
                        :Anchord="navbutton.Anchor"
                        :idd="navbutton.id"
                    ></navButton>
                </ul>
            </div>
        </div>

        <footer>
            <NavButtomPageBtn></NavButtomPageBtn>
            <p>&copy; {{ footerText }}</p>
        </footer>
    </nav>
</template>

<script>
import navButton from './navButton.vue'
import NavButtomPageBtn from './navButtomPageBtn.vue';

export default {
    data() {
        return {
            innerWidth: 0,
            navState: false,
            photoStickers: "../public/photoStickers.png",
            navSelfIntroductionH2: "張榮展",
            navSelfIntroductionP: "努力自學前端，立志成為前端工程師",
            navOptions: [
                {
                    name: "HOME",
                    Anchor: '/#header',
                },
                {
                    name: "ABOUT",
                    Anchor: '/#about',
                },
                {
                    name: "SKILLS",
                    Anchor: '/#skills',
                },
                {
                    name: "WORKS",
                    Anchor: '/#work',
                },
                {
                    name: "WORKEXPERIENCE",
                    Anchor: '',
                },

            ],
            footerText: 'Copyright ©2022 All rights reserved'
        };
    },
    mounted() {
        if (window.innerWidth >= 1440) {
            this.navState = true
        }



    },
    methods: {
        showNav: function () {
            this.navState = !this.navState;
        }
    },
    components: { navButton, NavButtomPageBtn }
}



</script>

<style scoped>
.indexNav {
    position: fixed;
    left: 0px;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 10px;
    width: 240px;
    height: 100vh;
    background: rgb(44, 45, 50);
    transition: all 1s;
    transition-timing-function: cubic-bezier(0.3, 0.59, 0.2, 1);
    z-index: 3;
    
}

.indexNav > div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    margin-top: 50px;

    width: 100%;
    height: 100%;
}

.openNav {
    left: 0px;
}

.closeNav {
    left: -260px;
}

/* 秀出nav按鈕 */
.showNav {
    position: absolute;
    right: -50px;
    top: 0;
    width: 50px;
    height: 50px;
    color: #fff;
    background: #000;
    border: none;
    border-radius: 0 0 5px 0;
    cursor: pointer; /*滑鼠樣式*/
    z-index: 9999;
}
.showNav::before {
    content: "";
    position: absolute;
    top: calc(50% - 0.15rem);
    left: calc(50% - 1.2rem);

    width: 2.4rem;
    height: 0.3rem;

    background: #fff;

    border-radius: 40px;
    box-shadow: 0 10px 0 0 #fff, 0 -10px 0 0 #fff;
}

/* 照片和 h2 p 區 */
.photoStickers {
    position: relative;
    padding-bottom: 15px;
}
.photoStickers:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: calc(50% - 5rem);

    width: 10rem;
    height: 1px;
    border-bottom: 1px solid #fff;
}

.photoStickers h2 {
    color: rgb(255, 255, 255);
    font-weight: bold;
}
.photoStickers p {
    margin: auto;
    width: 80%;
    color: rgb(230, 230, 230);
    font-weight: bold;
}

.photoStickers img {
    width: 12rem;
    height: 12rem;
    border-radius: 100%;
    box-shadow: 0px 0px 20px 0px rgb(255, 255, 255);
}

.navOptions ul {
    padding: 0;
}

footer {
    margin: 0.5rem;
    color: rgb(146, 146, 146);
    font-size: 0.5rem;
}

@media (min-width: 1440px) {
    .indexNav {
        width: 19vw;
    }
    .closeNav {
        left: 0px;
    }
    .showNav {
        display: none;
    }
}

@media (min-width: 1920px) {
    .indexNav {
        left: 19.5vw;
        width: 15vw;
    }
}
</style>