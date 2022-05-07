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
            <div class="content">

                <div class="title">
                    <h2>
                        天氣預報平台
                    </h2>
                </div>
                <div class="controller">
                    <div class="weatherButton">
                        <router-link to="weatherPage">氣象預報</router-link>
                    </div>
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
        }, 5000);
    }

}

</script>



<style scoped>
#mainPage {
    position: relative;
    width: 100%;
    height: calc(100vh - 5rem - 3rem);
    overflow: hidden;
}

#mainPage .photoBox {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
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

#mainPage .content {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    z-index: 2;
}

#mainPage .title {
    display: flex;
    justify-content: center;
    width: 100%;
}

#mainPage .title h2 {
    display: inline-block;
    margin-top: 5rem;
    margin-bottom: 0;
    padding: 0.5rem 3rem;

    text-align: center;
    font-size: 2.5rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    text-shadow: 2px 2px 0 #000;
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


@media (min-width: 1024px) {
    #mainPage .title h2 {
        display: inline-block;
        margin-top: 2.5rem;

        font-size: 2.5rem;
    }

    #mainPage .controller .weatherButton a {
        position: absolute;
        left: calc(50% - 4rem);
        bottom: 15%;

        width: 8rem;
        height: 8rem;
        font-size: 1.5rem;

        line-height: 8rem;

    }
}

@media (min-width: 1440px) {
    #mainPage .title h2 {
        display: inline-block;
        margin-top: 3rem;

        font-size: 3rem;
    }

    #mainPage .controller .weatherButton a {
        position: absolute;
        left: calc(50% - 5rem);
        bottom: 10%;

        width: 10rem;
        height: 10rem;
        font-size: 2rem;

        line-height: 10rem;
    }
}
</style>
