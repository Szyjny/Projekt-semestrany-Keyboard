<template>
	<section id="upgrades">
		<p id="buu">Dupa {{ CLIENT.show_money() }}</p>

		<div id="upgrades_container">
			<div
				v-for="colector of CLIENT.colectors"
				@click="buy_upgrade(colector)"
				class="mini_cont"
			>
				<div class="yok" v-if="colector.unlock">
					<div v-if="colector.unlock" class="icon_container">
						<img :src="colector.icon" alt="" />
					</div>
					<div>
						<div class="row">
							<strong>{{ colector.name }}</strong>
							<strong>
								cps:
								{{ numeral(colector.incom.value).format("0.00a") }}$
							</strong>
						</div>
						<p v-html="colector.short_discription"></p>
					</div>
					<div id="bottom_upgrade">
						<p>posiadane: {{ colector.count }}</p>
						<p>
							koszt:
							{{
								numeral(colector.cost.value * multipy).format("0.00a")
							}}$
						</p>
						<p class="text_center">
							szt: {{ numeral(colector.cost.value).format("0.00a") }}$
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import numeral from "numeral";
import CLIENT, { Upgrade } from "../scripts/client";

const multipy = ref<number>(1);

function buy_upgrade(upgrade: Upgrade): void {
	CLIENT.buy_upgrade(upgrade);
}
</script>

<style scoped lang="scss">
#upgrades {
	color: #fff;
	text-shadow: 0 0 1px rgb(211, 202, 202);
}

#upgrades_container {
	display: flex;
	flex-direction: column;
	width: 80%;
	max-height: 70svh;
	height: 70svh;
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

.mini_cont {
	height: max-content;
}

#buu {
	margin-top: 1rem;
}

.row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5em;
	font-size: 1.2rem;
}

.yok {
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-template-rows: max-content max-content;
	grid-template-areas:
		"icon what_is_this"
		"bottom_info bottom_info";
	gap: 1rem;
	padding: 1em;
	border-radius: 1em;
	height: max-content;
	width: 100%;
	margin-block: 1rem;
	background-color: #1f1f1f;
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
}
</style>
