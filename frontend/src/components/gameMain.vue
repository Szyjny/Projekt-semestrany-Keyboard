<template>
	<main>
		<keyboardComponent />
		<UpgradesComponent/>
	</main>
</template>

<script setup lang="ts">
import keyboardComponent from "./keyboard.vue";
import UpgradesComponent from "./upgrades.vue";
</script>

<style scoped lang="scss">
// ! Animacja chowania zakładki z upgrades

// @keyframes ow {
// 	100% {
// 		grid-template-columns: 1fr 0;
// 	}
// }
// main {
//    transition: grid-template-columns ease-in 3s;
//    animation: ow 3s ease 1s infinite;
// }

main {
	display: grid;
	grid-template-columns: 1fr 30%;
	grid-template-rows: 100%;
   will-change: grid-template-columns;
}

#upgrades {
	display: flex;
	align-items: center;
	flex-direction: column;
	// width: 40%;
	background-color: #3c3c3c;
}
</style>
