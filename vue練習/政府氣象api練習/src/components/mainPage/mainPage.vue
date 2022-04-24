<template>
    <div id="mainPage">
        <div class="mainPageBox">
            <div class="photoBox">
                <div class="photo">
                    <img :class="showPhoto === 0 ? 'photoIn' : 'photoOut'" src="../../assets/images/indexPage/101.webp"
                        alt="">
                </div>
                <div class="photo">
                    <img :class="showPhoto === 1 ? 'photoIn' : 'photoOut'" src="../../assets/images/indexPage/山.webp"
                        alt="">
                </div>
                <div class="photo">
                    <img :class="showPhoto === 2 ? 'photoIn' : 'photoOut'" src="../../assets/images/indexPage/city.webp"
                        alt="">
                </div>
            </div>

            <div class="controller">
                <div class="weatherButton">
                    <router-link to="adb">氣象預報</router-link>
                </div>


            </div>
        </div>




    </div>
</template>
<script>
export default {
    data() {
        return {
            showPhoto: 0
        }
    },
    created() {

        const vm = this;
        const photoSetTime = setInterval(() => {
            if (vm.showPhoto === 2) vm.showPhoto = 0;
            else vm.showPhoto++;
        }, 10000);
    }

}

</script>



<style scoped>
/* 幻燈片 */
.photoIn {
    animation: photoIn 2s ease forwards;
}

.photoOut {
    animation: photoOut 2s ease forwards;
}

@keyframes photoIn {
    0% {
        /* transform: translateX(100vw); */
        opacity: 0;
    }

    100% {
        opacity: 1;
        /* transform: translateX(0); */
    }
}

@keyframes photoOut {
    0% {
        opacity: 1;
        /* transform: translateX(0); */
    }

    100% {
        opacity: 0;
        /* transform: translateX(-100vw); */
    }
}



#mainPage {
    position: relative;
    width: 100%;
    height: calc(100vh - 5rem);
    overflow: hidden;
}

#mainPage .photoBox {
    position: relative;
    width: 100%;
    height: 100%;
}

#mainPage .photo {

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 5rem);
}

#mainPage .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


/* 按鈕 */
#mainPage .controller .weatherButton a {
    position: absolute;
    left: calc(50% - 5rem);
    bottom: 20%;

    width: 10rem;
    height: 10rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    line-height: 10rem;

    color: #fff;

    background: rgba(255, 255, 255, 0.243);
    border: 5px solid #fff;
    border-radius: 100%;

    box-shadow: inset 0px 0 0 0 rgb(0, 251, 255);


    transition: 0.5s;

    cursor: pointer;
    z-index: 9;
}

#mainPage .controller .weatherButton a:hover {
    color: rgb(0, 102, 255);

    box-shadow: inset 10rem 0px 0px 0 rgb(255, 251, 0);
}



#mainPage .controller .weatherButton a {
    text-decoration: none;
}

#mainPage .controller .weatherButton a:visited {
    /* color: #fff; */
}
</style>
