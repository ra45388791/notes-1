<template>

    <footer>
        <div class="footerContent">
            <div class="content">

                <h2>{{ titleH2 }}</h2>
                <div class="technology">
                    <h3>{{ titleH3 }}</h3>
                    <div v-for=" skill of skillComp " class="technologyImg">
                        <div class="image">
                            <img :src="skill.image.url" alt="">
                        </div>
                        <p>{{ skill.title }}</p>
                    </div>

                </div>
                <p>{{ copyright }}</p>
            </div>
        </div>
    </footer>


</template>
<script>



export default {
    data() {
        return {
            titleH2: 'thankyou for watch',
            titleH3: '使用技術:',
            copyright: '© Copyright ©2022 All rights reserved',
            skills: ['Vue.JS', 'Vite', 'git', 'npm', 'Figma', 'Photoshop']
        };
    },
    computed: {
        skillComp: function () {
            let vm = this
            const deta = this.$store.state.skillDatas;

            const deta1 = deta[0].article;
            const deta2 = deta[1].article;
            const deta3 = deta[2].article;
            const parseDeta1 = deta1.filter(function (e) {
                for (let s of vm.skills) {
                    if (e.title === s) return e;
                }
            })
            const parseDeta2 = deta2.filter(function (e) {
                for (let s of vm.skills) {
                    if (e.title === s) return e;
                }
            })
            const parseDeta3 = deta3.filter(function (e) {
                for (let s of vm.skills) {
                    if (e.title === s) return e;
                }
            })

            const finalData = parseDeta1.concat(parseDeta2, parseDeta3);
            const finalData2 = finalData.filter(e => { if (e) return true })    //把undefind拿掉

            return finalData2
        }
    }


}
</script>
<style scoped>
.footerContent {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 1rem;
    background: #343434;
    z-index: 2;
}

.footerContent:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    border-radius: 100% 100% 0 0;
    background: #4e4e4e;
}

.content {
    position: relative;
    width: 14rem;
    z-index: 2;
}

.content h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
    color: rgb(87, 87, 87);
}

.content .technology {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.content .technology h3 {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(122, 122, 122);
}

.content .technologyImg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem 1rem;

    /* width: 5rem; */
    height: 100%;
}

.content .technologyImg:nth-last-child(1) {
    margin-right: auto;
}

.content .technologyImg .image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    width: 5rem;
    height: 3rem;
}

.content .technologyImg img {
    max-width: 100%;
    max-height: 100%;
}

.content .technologyImg p {
    margin: 0;
    text-align: center;
    color: rgb(122, 122, 122);
}

.content>p {
    color: rgb(122, 122, 122);

}

@media (min-width:1024px) {
    .content {

        width: auto;

    }

    .content .technology {
        flex-wrap: nowrap;
        width: auto;
    }

    .content .technology h3 {
        margin: 0;
    }

}
</style>