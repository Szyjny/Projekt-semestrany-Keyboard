<template>
	<div
		v-if="colector && colector.unlock"
		v-bind:class="{ hide: colector.count === 0 }"
		class="colector"
		@click="buy_upgrade(colector, upgrades_cost(colector.cost))"
	>
		<div class="icon_container">
			<img :src="colector.icon" alt="" />
		</div>
		<div>
			<div class="row">
				<strong>{{ colector.name }}</strong>
				<strong>
					cps: {{ numeral(colector.incom).format("0.00a") }}$
				</strong>
			</div>
			<p v-html="colector.short_discription"></p>
		</div>
		<div id="bottom_upgrade">
			<p>posiadane: {{ colector.count }}</p>
			<p>
				koszt:
				{{ numeral(upgrades_cost(colector.cost)).format("0.00a") }}$
			</p>
			<p class="text_center">
				szt: {{ numeral(colector.cost).format("0.00a") }}$
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import numeral from "numeral";
import CLIENT, { Upgrade } from "../scripts/client";

// Odbieranie przekazanej właściwości "colector" z komponentu nadrzędnego
defineProps({
	colector: Object as () => Upgrade,
});

function buy_upgrade(colector: Upgrade, cost: number): void {
	CLIENT.buy_upgrade(colector, cost);
}

function upgrades_cost(cost: number): number {
	for (let i = 0; i < CLIENT.multipy.value - 1; i++) {
		cost = cost * 1.15 + cost;
	}
	return cost;
}
</script>

<style scoped lang="scss">
.row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5em;
	font-size: 1.2rem;
}

.colector {
	cursor: pointer;
	position: relative;
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-template-rows: max-content max-content;
	grid-template-areas: "icon what_is_this" "bottom_info bottom_info";
	gap: 1rem;
	padding: 1em;
	border-radius: 1em;
	border: outset 1px #000000;
	height: max-content;
	width: 80%;
	margin-block: 1rem;

	background-size: 600%;
	background-position: center;
	background-image: linear-gradient(
		45deg,
		#581a1a,
		#850101,
		#1f1f1f,
		#342f2f,
		#275424,
		#199b12
	);
	filter: drop-shadow(0 0 0.5em #1f1f1f);
	transition: filter 1s ease, scale 1s ease;

	&:hover {
		filter: drop-shadow(0 0 1.5em hsl(0, 3%, 8%));
		scale: 1.05;
	}
}

.hide {
	opacity: 0.5;
}

#bottom_upgrade {
	display: flex;
	align-items: center;
	justify-content: space-between;
	grid-area: bottom_info;

	p {
		width: max-content;
	}
}

.icon_container {
	width: max-content;
	min-width: 5rem;
}

img {
	height: calc(3svh + 1svw);
	width: 80%;
}
</style>
