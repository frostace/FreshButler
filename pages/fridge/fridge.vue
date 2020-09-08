<template>
	<view @click="globalClick">
		<view class="status_bar" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:15rpx'">
			<view class="status_bar-content" :style="'top:' + demo.top + 'px'">
				<view class="status_bar-pageName">
					冰箱
				</view>
				<view class="status_bar-buttons">
					<text class="status_bar-icon iconfont" @click="showModal">&#xe629;</text> <!-- add -->
					<text class="status_bar-icon iconfont">&#xe60c;</text>
				</view>
			</view>
		</view>
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
				v-for="(item, idx) in floatingButtons"
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
		
		<!-- Modal Component -->
		<wyb-modal 
			ref="modal" 
			title="新增食材" 
			custom=true
			cancel-text="取消"
			confirm-text="确认"
			@cancel="onCancelClick"
			@confirm="onConfirmClick">
			<view class="modal-content">
				<view class="modal-row edit-ingrdt-name">
					<view class="modal-title ingrdt-name">名称</view>
					<input class="modal-row-right ingrdt-input ingrdt-name-input" type="text" v-model="configuredName" placeholder="西红柿"/>
				</view>
				
				<view class="modal-row edit-ingrdt-amount">
					<view class="modal-title ingrdt-amount">数量</view>
					<view class="modal-row-right">
						<text class="ingrdt-amount-minus">-</text>
						<input class="ingrdt-input ingrdt-amount-input" type="text" v-model="configuredAmount" />
						<view class="ingrdt-amount-unit">克</view>
						<text class="ingrdt-amount-plus">+</text>
					</view>
				</view>
				
				<view class="modal-row edit-ingrdt-category">
					<view class="modal-title ingrdt-category">分类</view>
					<!-- dropdown -->
					<xfl-select 
						class="modal-row-right"
						:list="list"
						:clearable="false"
						:showItemNum="5" 
						:listShow="true"
						:isCanInput="false"  
						:style_Container="'height: 40px; font-size: 16px;'"
						:placeholder = "'placeholder'"
						:initValue="'主食'"
						:selectHideType="'hideAll'"
						@change="handleSelectChange"
					>
					</xfl-select>
				</view>
				
				<view class="edit-ingrdt-advanced">
					高级选项
				</view>
			</view>
		</wyb-modal>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import wybModal from '@/components/wyb-modal/wyb-modal.vue';
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	
	import { mapGetters, mapActions } from 'vuex';
	import object2params from '../../helpers/object2params.js';
	
	export default {
		components: {
			uniIndexedList,
			uniIcons,
			wybModal,
			xflSelect
		},
		data() {
			return {
				editingAllDishes: false,
				demo: {
					top: 0,
					height: 0
				},
				list: ['主食', '蔬菜', '肉类', '水果'],
				configuredName: "",
				configuredAmount: 0,
				configuredCategory: "",
			};
		},
		created () {
			const demo = uni.getMenuButtonBoundingClientRect();
			this.demo.top = demo.top;
			this.demo.height = demo.height;
		},
		computed: {
			...mapGetters(['getIngredientList', 'getSelectedIngredients']),
			trimmedIngredients() {
				let completeIngredients = this.getSelectedIngredients.map(item => item.charAt(0)).toString();
				return completeIngredients.length > 6 ? completeIngredients.slice(0, 6) + "..." : completeIngredients;
			},
			floatingButtons() {
				return [
					{
						imgPath: this.editingAllDishes ? "../../static/icon/finish.png" : "../../static/icon/edit.png",
						name: "edit",
						text: this.editingAllDishes ? "完成" : "编辑",
					},
					{
						imgPath: "../../static/icon/dice-five.png",
						name: "random",
						text: "随机选菜",
					}
				];
			}
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
						this.editingAllDishes || this.unEditAllDishes();
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
			},
			unEditAllDishes() {
				
			},
			showModal() {
				this.$refs.modal.showModal();
			}, 
			onConfirmClick() {
				console.log("adding: ", this.configuredName, this.configuredAmount, this.configuredCategory);
				// add dish to corresponding section
				// clear configured dish attributes 
				this.clearConfiguredDishAttr();
			},
			onCalcelClick() {
				
			},
			clearConfiguredDishAttr() {
				this.configuredName = "";
				this.configuredAmount = 0;
				this.configuredCategory = "";
			},
			handleSelectChange(selected) {
				this.configuredCategory = selected.newVal;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/var";
	@import "../../common/presets";
	@import "../../common/iconfont";
	
	.status_bar {
		position: relative;
		@include flex-template(row);
		background: #eee;
		font-size: 26rpx;
		height: calc(var(--status-bar-height));
		width: 100%;
		&-content {
			@include flex-template(row, space-between);
			
			float: left;
			position: absolute;
			width: 70%;
			height: max-content;
			top: 0;
			bottom: 0;
			left: 20rpx;
			margin: auto;
			.iconfont{
				color: #3C3C3C;
			}
		}
		&-icon {
			margin: 0 10px;
		}
	}
	
	.floating-buttons {
		@include flex-template(row);
		
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
		@include flex-template(row);
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
		@include flex-template(row);
		
		color: white;
		font-size: 14px;
		height: 30px;
		flex: 1 0 20vw;
	}
	
	.floating-button-text {
		margin-left: 10px;
		font-size: 14px;
	}
	
	// styling for modal
	.modal-content {
		@include flex-template(column);
	}
	
	.modal-row {
		@include flex-template(row, space-between);
		width: 80%;
		&:not(:last-child) {
			margin-bottom: 15px;
		}
		
		// left
		&-left {
			
		}
		// right
		&-right {
			@include flex-template(row, space-between);
			flex: 1 1 auto;
		}
	}
	
	.ingrdt-input {
		@include default-border-style(#c0c4cc);
		border-radius: 4px;
		height: 40px;
		padding: 0 10px;
	}
	
	.ingrdt-amount-input {
		flex: 0 1 40rpx;
	}
	
	.modal-title {
		flex: 0 0 60px;
	}
</style>
