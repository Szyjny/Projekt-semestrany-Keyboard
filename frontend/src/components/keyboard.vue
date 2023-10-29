<template>
	<section id="keyboard_wrapper">
		<section id="keyboard">
			<p id="combo_counter">Combo: {{ clickCount }}</p>
			<img
				id="using_keyboard"
				src="../assets/keyboards/Klawiatura.svg"
				alt=""
				@click="handleClick()"
			/>
			<p>mak</p>
		</section>

		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import CLIENT from "../scripts/client";

const clickCount = ref(0);
let clickTimeout: number | null = null;
let USING_KEYBOARD: HTMLElement | null = null;

onMounted(() => {
	// Zresetuj licznik na początku
	clickCount.value = 0;
	USING_KEYBOARD = document.getElementById("using_keyboard");
});

const handleClick = () => {
	clickCount.value++;
	CLIENT.click_keyboard();

	// Rotating keyboard
	if (USING_KEYBOARD) {
		if (clickCount.value % 2) {
			USING_KEYBOARD.style.rotate = `${
				Math.floor(Math.random() * 7.5) + 2.5
			}deg`;
		} else {
			USING_KEYBOARD.style.rotate = `${
				0 - Math.floor(Math.random() * 7.5) + 2.5
			}deg`;
		}
	}

	// Resetuj licznik po 3 sekundach
	if (clickTimeout) {
		clearTimeout(clickTimeout);
	}
	clickTimeout = setTimeout(() => {
		clickCount.value = 0;
		if (USING_KEYBOARD) USING_KEYBOARD.style.rotate = `0deg`;
	}, 2000);
};

onBeforeUnmount(() => {
	// Wyczyść timeout przed odmontowaniem komponentu
	if (clickTimeout) {
		clearTimeout(clickTimeout);
		if (USING_KEYBOARD) USING_KEYBOARD.style.rotate = `0deg`;
	}
});
// const keyboard = ref<number>(0);
</script>

<style scoped lang="scss">
#keyboard_wrapper {
	display: grid;
	grid-template-columns: 1fr 10fr 1fr;
	grid-template-rows: 1fr 10fr 1fr;
	grid-template-areas:
		"corner_lt top corner_rt"
		"corner_l main corner_r"
		"corner_lb bottom corner_rb";
	width: 100%;
	height: 100%;

	* {
		outline: solid 1px lime;
	}
}

#keyboard {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 2rem;
	margin: 0 auto;
	width: max-content;
	grid-area: main;
	background-color: #582d761b;
}

#using_keyboard {
	cursor: pointer;
	height: 20svh;
	will-change: filter;
	transition: filter ease 1s, rotate ease 250ms;

	&:hover {
		filter: drop-shadow(0 0 2em #41b883);
	}
}

#combo_counter {
	font-size: 3rem;
}
</style>
