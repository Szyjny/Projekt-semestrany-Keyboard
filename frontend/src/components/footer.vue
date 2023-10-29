<template>
	<footer>
		<div id="content">
			<div class="icons">
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test">
					<img src="../assets/keyboards/Klawiatura.svg" alt="" />
				</div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"><img src="../assets/vue.svg" alt="" /></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
#content {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: auto;
	margin: 0 auto;
	gap: 1rem;
	max-width: 1750px;
	// background-color: #ffffff1a;
}

.icons {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: auto;
	gap: 1.5rem;
	height: 100%;
	// -webkit-mask: linear-gradient(
	// 	90deg,
	// 	transparent 0,
	// 	#000 5%,
	// 	#000 95%,
	// 	transparent 100%
	// );
	// background-color: #ffffff1a;
}
.test {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 6svh;
	min-height: 6svh;
	border-radius: 0.5rem;
	background-color: #ffffff;
	// background-clip: content-box;
}
</style>
