<template>
	<view>
		<uni-indexed-list :options="ingredientList" :showSelect="false" @click="bindClick"></uni-indexed-list>
		<view class="floating-section">
			<fixed-button>
				<view class="floating-discovery">
					<view class="floating-discovery-ingrdt" >{{trimmedIngredients}}</view>
					<image 
						class="floating-discovery-icon" 
						src="../../static/icon/knife-fork.png" 
						mode="">
					</image>
				</view>
			</fixed-button>
			<fixed-button><view>+</view></fixed-button>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
	import fixedButton from "@/components/fixed-button/fixed-button.vue";
	export default {
		components: {
			uniIndexedList,
			fixedButton,
		},
		data() {
			return {
				ingredientList: [
					{
						"letter": "主食",
						"data": [
							"山东拉面",
							"意面",
							"年糕",
							"大米",
						]
					}, 
					{
						"letter": "蔬菜",
						"data": [
							"大白菜",
							"莴苣",
							"西洋菜",
							"芥兰苗",
							"胡萝卜",
							"鸡腿菇"
						]
					},
					{
						"letter": "肉类",
						"data": [
							"鸡胸肉",
							"牛尾",
							"排骨",
							"五花肉",
							"鸡翅",
							"牛绞肉"
						]
					},
					{
						"letter": "水果",
						"data": [
							"香蕉",
							"苹果",
							"西瓜",
							"柠檬",
							"橙子",
							"榴莲"
						]
					},
					{
						"letter": "调料",
						"data": [
							"盐",
							"糖",
							"蕃茄酱",
							"胡椒粉",
							"小茴香",
							"醋",
							"酱油"
						]
					},
					{
						"letter": "饮料",
						"data": [
							"可乐",
							"柠檬汁",
							"白葡萄酒",
						]
					},
					{
						"letter": "其他",
						"data": [
							"榨菜",
						]
					},
				],
				selectedIngredients: [],
			};
		},
		computed: {
			trimmedIngredients() {
				let completeIngredients = this.selectedIngredients.map(item => item.charAt(0)).toString();
				return completeIngredients.length > 6 ? completeIngredients.slice(0, 6) + "..." : completeIngredients;
			},
		},
		methods: {
			bindClick(e, obj) {
				let ingrdtIdx = this.selectedIngredients.indexOf(e.item.name);
				ingrdtIdx !== -1 ? this.selectedIngredients.splice(ingrdtIdx, 1) : this.$set(this.selectedIngredients, this.selectedIngredients.length, e.item.name);
			}
		}
	}
</script>

<style lang="scss">
	.floating-section {
		width: calc(100vw - 80px);
		
		position: fixed;
		left: 58px;
		bottom: 20px;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.floating-discovery {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 40px;
	}
	
	.floating-discovery-ingrdt {
		margin-right: 5px;
	}
	
	.floating-discovery-icon {
		width: 28px;
		height: 28px;
	}
	
</style>
