<template>
	<section id="upgrades">
		<input v-model="CLIENT.multipy.value" type="number" />
		<p>{{ CLIENT.multipy }}</p>
		<a href="../../test.html">tt</a>

		<div id="upgrades_container">
			<UpgradeComponent
				v-for="colector in CLIENT.colectors.value"
				:key="colector.id"
				:colector="colector"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import CLIENT from "../scripts/client";
import UpgradeComponent from "./upgrade.vue";
</script>

<style scoped lang="scss">
#upgrades {
	color: #fff;
	text-shadow: 0 0 1px rgb(211, 202, 202);
}

#upgrades_container {
	display: flex;
	align-items: center;
	flex-direction: column;
	max-height: 70svh;
	height: 70svh;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;

	-webkit-mask: linear-gradient(
		0deg,
		transparent 0,
		#000 2%,
		#000 98%,
		transparent 100%
	);
}

#buu {
	margin-top: 1rem;
}
</style>
