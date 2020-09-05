<template>
	<view class="container">
		<view>首页内容暂无</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		computed: {
			...mapGetters(['getRandomized', 'getSelectedIngredients']),
		},
		methods: {

		},
		onShow() {
			console.log(this.getRandomized, this.getSelectedIngredients);
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
