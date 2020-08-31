<template>
	<view @click="globalClick">
		<uni-indexed-list :options="getIngredientList" :showSelect="false" @click="bindClick"></uni-indexed-list>
		<view class="floating-section">
			<fixed-button @tap="discoverDishes">
				<view class="floating-discovery">
					<view
						v-if="selectedIngredients.length > 0"
						class="floating-discovery-ingrdt"
					>{{trimmedIngredients}}
					</view>
					<image 
						class="floating-discovery-icon" 
						src="../../static/icon/knife-fork.png" 
						mode="">
					</image>
				</view>
			</fixed-button>
			<!-- <fixed-button><view>+</view></fixed-button> -->
			<uni-fab
				@trigger="trigger"
			>
				<template v-slot:content>
					<view
						class="uni-fab-item"
						v-for="(item, idx) in popperIcons"
						:key="item.text"
						@click="handleClickItem($event, item.text)"
					>
						<image
							class="floating-discovery-icon uni-fab-item-icon" 
							:src="item.imgPath">
						</image>
						<text class="uni-fab-item-text">{{item.text}}</text>
					</view>
				</template>
				<template v-slot:box>
					+
				</template>
			</uni-fab>
		</view>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
	import fixedButton from "@/components/fixed-button/fixed-button.vue";
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import { mapState, mapGetters } from 'vuex';
	import object2params from '../../helpers/object2params.js';
	
	export default {
		components: {
			uniIndexedList,
			fixedButton,
			uniFab,
			uniIcons
		},
		data() {
			return {
				popperExpanded: false,
				popperIcons: [
					{
						imgPath: "../../static/icon/edit.png",
						text: "编辑",
						
					},
					{
						imgPath: "../../static/icon/dice-five.png",
						text: "随机选菜",
					}
				],
				selectedIngredients: [],
			};
		},
		computed: {
			...mapGetters(['getIngredientList']),
			trimmedIngredients() {
				let completeIngredients = this.selectedIngredients.map(item => item.charAt(0)).toString();
				return completeIngredients.length > 6 ? completeIngredients.slice(0, 6) + "..." : completeIngredients;
			},
		},
		methods: {
			bindClick(e, obj) {
				let ingrdtIdx = this.selectedIngredients.indexOf(e.item.name);
				ingrdtIdx !== -1 ? this.selectedIngredients.splice(ingrdtIdx, 1) : this.$set(this.selectedIngredients, this.selectedIngredients.length, e.item.name);
			},
			handleClickItem(e, text) {
				uni.$emit('hideItems');
			},
			trigger() {},
			globalClick() {
				uni.$emit('hideItems');
			},
			discoverDishes(e) {
				// maintain vuex randomized
				// maintain vuex selectedIngredients
				
				uni.switchTab({
					url: "/pages/index/index",
					// params to be concatenated
				})
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
	
	.uni-fab-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		
		color: white;
		font-size: 14px;
		height: 30px;
		&:not(:last-child) {
			border-bottom: solid 1px white;
			padding-bottom: 10px;
		}
		&:not(:first-child) {
			padding-top: 10px;
		}
		
		&-icon {
			flex: 1 0 auto;
			margin-right: 10px;
		}
		
		&-text {
			flex: 1 0 auto;
			width: 70px;
		}
		
	}
</style>
