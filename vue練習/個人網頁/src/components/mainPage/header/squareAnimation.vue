<template>
    <div ref="square" style="opacity: 0;" id="squareBox">
        <div class="box">
            <div class="square square1">

            </div>
        </div>
        <div class="box">
            <div class="square square2">

            </div>
        </div>
    </div>

</template>

<script>
import { observerRightFadeIn } from '../../../../script/observerFunc.js'
export default {
    mounted() {
        observerRightFadeIn.observe(this.$refs.square)
    }
}
</script>

<style scoped>
#squareBox {
    /* 方形底層 */
    position: absolute;
    right: -7.5rem;
    top: -7rem;

    margin: 0;
    padding: 0;
    width: 15rem;
    height: 15rem;
}

#squareBox .box {
    position: absolute;
    /* top: calc(50% - 7.5rem);
    left: calc(50% - 7.5rem); */
    width: 100%;
    height: 100%;
}

#squareBox .box .square1 {
    animation: rigthSquare 15s 0s linear infinite;
}

#squareBox .box .square2 {

    animation: inverseRigthSquare 15s 0s linear infinite;

}


@keyframes rigthSquare {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes inverseRigthSquare {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-360deg);
    }
}

#squareBox .square {
    /* 方形 */
    /* position: absolute;
    left: 0;
    top: 0; */

    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.square1 {
    /* border: 15px solid rgb(83, 221, 255); */
    border: 15px solid rgb(97, 226, 255);
}

.square2 {
    border: 15px solid rgb(0, 140, 255);
}


#squareBox .square::before {
    /* 圓形 */
    content: "";
    position: absolute;
    left: calc(50% - 4rem);
    top: calc(50% - 4rem);

    width: 8rem;
    height: 8rem;
    /* background: #000; */

    border-radius: 100%;
    box-sizing: border-box;

    transform: rotate(90deg);
}

.square1::before {
    border-top: 12px solid rgba(0, 255, 251, 0);
    border-bottom: 12px solid rgba(0, 255, 251, 0);
    border-left: 12px solid rgb(0, 0, 255);
    border-right: 12px solid rgb(255, 251, 0);

}

.square2::before {
    border-top: 12px solid rgba(0, 255, 251, 0);
    border-bottom: 12px solid rgba(0, 255, 251, 0);
    border-left: 12px solid rgb(0, 255, 0);
    border-right: 12px solid rgb(255, 0, 0);
}


@media (min-width: 425px) {
    #squareBox {
        /* 方形底層 */

        top: calc(50% - 12rem);
        right: -12.5rem;

        width: 25rem;
        height: 25rem;
    }

    .square1 {
        /* border: 15px solid rgb(83, 221, 255); */
        border: 25px solid rgb(97, 226, 255);
    }

    .square2 {
        border: 25px solid rgb(0, 140, 255);
    }

    #squareBox .square::before {
        /* 圓形 */
        left: calc(50% - 6rem);
        top: calc(50% - 6rem);

        width: 12rem;
        height: 12rem;

    }

    .square1::before {
        border-top: 1.2rem solid rgba(0, 255, 251, 0);
        border-bottom: 1.2rem solid rgba(0, 255, 251, 0);
        border-left: 1.2rem solid rgb(0, 0, 255);
        border-right: 1.2rem solid rgb(255, 251, 0);

    }

    .square2::before {
        border-top: 1.2rem solid rgba(0, 255, 251, 0);
        border-bottom: 1.2rem solid rgba(0, 255, 251, 0);
        border-left: 1.2rem solid rgb(0, 255, 0);
        border-right: 1.2rem solid rgb(255, 0, 0);
    }



}

@media (min-width: 1024px) {
    #squareBox {
        /* 方形底層 */

        top: calc(50% - 25rem);
        right: -25rem;

        width: 50rem;
        height: 50rem;
    }

    .square1 {
        /* border: 15px solid rgb(83, 221, 255); */
        border: 50px solid rgb(97, 226, 255);
    }

    .square2 {
        border: 50px solid rgb(0, 140, 255);
    }

    #squareBox .square::before {
        /* 圓形 */
        left: calc(50% - 12.5rem);
        top: calc(50% - 12.5rem);

        width: 25rem;
        height: 25rem;

    }

    .square1::before {
        border-top: 2.5rem solid rgba(0, 255, 251, 0);
        border-bottom: 2.5rem solid rgba(0, 255, 251, 0);
        border-left: 2.5rem solid rgb(0, 0, 255);
        border-right: 2.5rem solid rgb(255, 251, 0);

    }

    .square2::before {
        border-top: 2.5rem solid rgba(0, 255, 251, 0);
        border-bottom: 2.5rem solid rgba(0, 255, 251, 0);
        border-left: 2.5rem solid rgb(0, 255, 0);
        border-right: 2.5rem solid rgb(255, 0, 0);
    }

}

@media (min-width: 1920px) {
    #squareBox {
        /* 方形底層 */

        top: calc(50% - 40rem);
        right: -40rem;

        width: 80rem;
        height: 80rem;
    }

    .square1 {
        /* border: 15px solid rgb(83, 221, 255); */
        border: 60px solid rgb(97, 226, 255);
    }

    .square2 {
        border: 60px solid rgb(0, 140, 255);
    }

    #squareBox .square::before {
        /* 圓形 */
        left: calc(50% - 15rem);
        top: calc(50% - 15rem);

        width: 30rem;
        height: 30rem;

    }

    .square1::before {
        border-top: 2.5rem solid rgba(0, 255, 251, 0);
        border-bottom: 2.5rem solid rgba(0, 255, 251, 0);
        border-left: 2.5rem solid rgb(0, 0, 255);
        border-right: 2.5rem solid rgb(255, 251, 0);

    }

    .square2::before {
        border-top: 2.5rem solid rgba(0, 255, 251, 0);
        border-bottom: 2.5rem solid rgba(0, 255, 251, 0);
        border-left: 2.5rem solid rgb(0, 255, 0);
        border-right: 2.5rem solid rgb(255, 0, 0);
    }


}
</style>