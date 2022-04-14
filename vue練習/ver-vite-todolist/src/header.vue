<template>
    <header>
        <h1>
            <div class="noteImage">
                <img src="/images/notebook.png" alt="">
            </div>
            <samp>{{ title }}</samp>
        </h1>
    </header>
</template>
<script>
export default {
    data() {
        return {
            title: "To-Do-List"
        }
    }

}
</script>
<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 4rem;
    background: #126376;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    z-index: 2;
}

header h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 2rem;
    color: #fff;
}

header .noteImage {
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
}

header .noteImage img {

    width: 100%;
    height: 100%;

}

@media (min-width: 1024px) {
    header {
        position: relative;
        padding: 3rem 0;
        width: 100%;
        height: 15rem;
        background: #126376;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        z-index: 2;
    }

    header h1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        font-size: 3rem;
        color: #fff;
    }

    header .noteImage {
        margin-right: 0rem;
        margin-bottom: 1rem;
        width: 8rem;
        height: 8rem;
    }
}

@media (min-width: 1440px) {
    header {
        padding: 4rem 0;
    }
}
</style>
