<template>
	<view @click="globalClick">
		<uni-indexed-list 
			:options="getIngredientList" 
			:showSelect="false" 
			:editingAll="editingAllDishes"
			@click="clickSingleDish"
		></uni-indexed-list>
		<view class="floating-buttons" >
			<view class="floating-discovery" @click="discoverDishes">
				<view
					v-if="getSelectedIngredients.length > 0"
					class="floating-discovery-ingrdt"
				>{{trimmedIngredients}}
				</view>
				<image 
					class="floating-button-icon" 
					src="../../static/icon/knife-fork.png" 
					mode="">
				</image>
			</view>
			<view
				class="floating-button"
				:class="'floating-' + item.name"
				v-for="(item, idx) in popperIcons"
				:key="item.text"
				@click="clickDetailButton($event, item.name)"
			>
				<image
					class="floating-button-icon" 
					:src="item.imgPath">
				</image>
				<text class="floating-button-text">{{ item.text }}</text>
			</view>
		</view>
		<!-- <uni-fab
			@trigger="trigger"
		>
			<template v-slot:content>
				<view
					class="uni-fab-item"
					v-for="(item, idx) in popperIcons"
					:key="item.text"
					@click="clickDetailButton($event, item.name)"
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
		</uni-fab> -->
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import { mapGetters, mapActions } from 'vuex';
	import object2params from '../../helpers/object2params.js';
	
	export default {
		components: {
			uniIndexedList,
			uniIcons
		},
		data() {
			return {
				editingAllDishes: false,
				popperExpanded: false,
				popperIcons: [
					{
						imgPath: "../../static/icon/edit.png",
						name: "edit",
						text: "编辑",
					},
					{
						imgPath: "../../static/icon/dice-five.png",
						name: "random",
						text: "随机选菜",
					}
				],
			};
		},
		computed: {
			...mapGetters(['getIngredientList', 'getSelectedIngredients']),
			trimmedIngredients() {
				let completeIngredients = this.getSelectedIngredients.map(item => item.charAt(0)).toString();
				return completeIngredients.length > 6 ? completeIngredients.slice(0, 6) + "..." : completeIngredients;
			},
		},
		methods: {
			...mapActions(['commitSelectedIngredients', 'commitRandomized']),
			clickSingleDish(e, obj) {
				const newSelectedIngredients = this.getSelectedIngredients;
				let ingrdtIdx = newSelectedIngredients.indexOf(e.item.name);
				ingrdtIdx !== -1 ? newSelectedIngredients.splice(ingrdtIdx, 1) : newSelectedIngredients.push(e.item.name);
				this.commitSelectedIngredients(newSelectedIngredients);
			},
			clickDetailButton(e, buttonName) {
				uni.$emit('hideItems');
				// check which one is clicked
				// allocate handler for the specific button
				switch (buttonName) {
					case "edit":
						this.editingAllDishes = !this.editingAllDishes;
						break;
					case "random":
						this.commitRandomized(true);
						setTimeout(() => this.commitRandomized(false), 200);
						this.jumpToDiscoveryTab();
						break;
					default:
				}
			},
			trigger() {},
			globalClick() {
				uni.$emit('hideItems');
			},
			discoverDishes(e) {
				this.jumpToDiscoveryTab();
			},
			jumpToDiscoveryTab() {
				uni.switchTab({
					url: "/pages/index/index",
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/var";
	@import "../../common/presets";
	
	.uni-indexed-list { 
		margin-bottom: 65px;
	}
	
	.floating-buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		
		width: calc(100vw - 20px);
		margin-left: 10px;
		border-radius: 10px;
		position: fixed;
		bottom: 15px;
		background-color: $--primary-color;
		
	}
	
	.floating-discovery, .floating-button {
		z-index: 100;
		color: #fff;
		font-size: 20px;
		white-space: nowrap;
		box-sizing: border-box;
		margin: 0;
		height: 40px;
	}
	
	.floating-discovery {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: calc(50vw - 20px);
	}
	
	.floating-discovery-ingrdt {
		margin-right: 5px;
	}
	
	.floating-button-icon {
		width: 24px;
		height: 24px;
	}
	
	.floating-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		
		color: white;
		font-size: 14px;
		height: 30px;
		flex: 1 0 20vw;
	}
	
	.floating-button-text {
		margin-left: 10px;
		font-size: 14px;
	}
</style>
