<template>
	<header>
		<div id="content">
			<div id="logo">Place for logo</div>
			<h1 id="game_name">Project Keyboard</h1>
			<h2 id="money_container">Kasa: {{ CLIENT.show_money() }}$ <strong>^</strong> cps: {{ CLIENT.show_money_per_sec() }}$</h2>
			<div id="nav">place for navigation elements</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import CLIENT from "../scripts/client";
</script>

<style scoped lang="scss">
strong {
   margin-inline: 1em;
}

#content {
	display: grid;
	grid-template-rows: 100%;
	grid-template-columns: max-content 2svw max-content 2svw 1fr 2svw max-content;
	grid-template-areas: "logo null1 game_name null2 money null3 nav";
	color: #000;
	height: 100%;
	width: min(1750px, calc(100% - 6rem));
	margin-inline: auto;
	background-color: #ffffff1a;
}

#logo,
#game_name,
#money_container,
#nav {
	display: flex;
	justify-content: center;
	align-items: center;
}

#logo {
	grid-area: logo;
	background-color: #ff0;
}

#game_name {
	grid-area: game_name;
	background-color: #f0f;
}

#money_container {
	grid-area: money;
	background-color: #0ff;
}

#nav {
	grid-area: nav;
	width: 500px;
	background-color: #0f0;
}

h2 {
	text-align: center;
}
</style>
