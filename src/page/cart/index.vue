<template>
	<div class="cart">
		<yt-header></yt-header>
		<div class="main-container flex">
			<s-aside></s-aside>
			<div class="main-content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	
}
</script>

<style lang="less" scoped>
.study{ width: 100%; height: 100%; background-color: #F2F3F4; overflow: hidden;
	.main-container{ height: 100%;
		.main-content{ padding: 20px; padding-bottom: 70px; overflow-y: scroll;}
	}
}
</style>
