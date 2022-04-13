<template>
	<header id="header">
		<div class="banner">
			<!-- <picture>
                <source srcset="/public/header/全身照xl.jpg" media="(min-width: 768px)" />
                <img src="/public/header/全身照sm.jpg" alt />
            </picture> -->
			<div ref="titleOne" class="content">
				<h2>
					<samp class="title1">{{ title }}</samp>
				</h2>
				<h2>
					<samp class="title1">{{ title2 }}</samp>
				</h2>
				<h3>{{ content1 }}</h3>
				<p>{{ content2 }}</p>
			</div>
		</div>
		<squareAnimation></squareAnimation>
	</header>
</template>

<script>
import { observerLeftFadeIn, testClass } from '../../../../script/observerFunc.js'
import squareAnimation from "./squareAnimation.vue";
export default {
	data() {
		return {
			title: "HI!你好",
			title2: "我叫做張榮展",
			content1: "歡迎來到我的個人網頁!",
			content2:
				"你將會看到關於我的介紹、我會甚麼技能、我有甚麼作品、以及其他各式各樣的事情。",
		};
	},
	mounted() {
		// observerLeftFadeIn.observe(this.$refs.titleOne);


		this.$nextTick(function () {

			const textClass1 = new testClass();
			//設定
			const setStyle = textClass1.setAnimation('opacity:0', 'leftFadeIn', 1, 300);

			//實例化observer
			const newObservertest = textClass1.newObserver(setStyle);

			//註冊事件
			newObservertest.observe(this.$refs.titleOne);
			// console.log(newObservertest);
		})

	},
	methods: {},
	components: { squareAnimation },
};
</script>

<style scoped>
#header {
	position: relative;
	display: flex;
	justify-content: center;

	width: 100%;
	height: 40rem;

	background: #1d1d1d;

	/* background-image: url(/header/computer.jpg);
    background-position: top left 35%;
    background-repeat: no-repeat;
    background-size: cover; */
	overflow: hidden;
}

.banner {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	/* background: rgba(141, 219, 255, 0.3); */
	/* background: rgba(141, 198, 255, 0.2); */
}

.banner::before {
	content: "";
	position: absolute;
	bottom: 1rem;
	left: calc(50% - 15px);

	border-top: 15px solid rgb(0, 255, 251);
	border-bottom: 0px solid rgb(0, 225, 0, 0);
	border-left: 15px solid rgb(0, 225, 0, 0);
	border-right: 15px solid rgb(0, 225, 0, 0);
	animation: square 1s 0s ease-in-out infinite;
}

@keyframes square {
	0% {
		transform: translateY(0px);
	}

	50% {
		transform: translateY(5px);
	}

	100% {
		transform: translateY(0px);
	}
}

.content {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 2rem;

	z-index: 2;
}

.content h2 {
	padding: 0rem 0 0.5rem;
	font-size: 2.5rem;
	text-align: start;
	color: #00ffee;
	/* color: rgb(255, 174, 0); */
}

.content .title1 {
	/* padding: 0.3rem 0rem 0.1rem;
    color: #fff; */
	/* background: rgb(0, 106, 255); */
	/* border-radius: 10px; */
}

.content h3 {
	margin: 0rem 0rem 1rem;
	font-size: 1.4rem;
	text-align: start;

	color: rgb(255, 255, 255);
	/* color: #00ffee; */
}

.content p {
	margin: 0;
	margin-bottom: 0.5rem;

	font-size: 1rem;
	line-height: 1.3rem;

	text-align: start;
	color: rgb(255, 255, 255);
}

@media (min-width: 425px) {
	.banner {
		justify-content: start;
	}

	.content {
		max-width: 25rem;
	}

	.content h2 {
		font-size: 3.7rem;
		text-align: start;
	}

	.content h3 {
		margin: 0rem 0rem 1rem;
		font-size: 1.4rem;
		text-align: start;

		color: rgb(255, 255, 255);
		/* color: #00ffee; */
	}

	.content p {
		margin: 0;
		margin-bottom: 0.5rem;

		font-size: 1rem;
		line-height: 1.3rem;

		text-align: start;
		color: rgb(255, 255, 255);
	}
}

@media (min-width: 1024px) {
	#header {
		height: 100vh;
	}

	.content {
		max-width: 30rem;
	}

	.content h2 {
		font-size: 5rem;
	}

	.content h3 {
		font-size: 2.5rem;
	}

	.content p {
		font-size: 1.1rem;
		line-height: 1.5rem;
		text-align: start;
	}
}
</style>
