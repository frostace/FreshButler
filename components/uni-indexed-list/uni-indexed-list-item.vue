<template>
	<view>
		<view v-if="loaded || itemList.itemIndex < 15" class="uni-indexed-list__title-wrapper">
			<text v-if="itemList.items && itemList.items.length > 0" class="uni-indexed-list__title">{{ itemList.key }}</text>
		</view>
		<view v-if="(loaded || itemList.itemIndex < 15) && itemList.items && itemList.items.length > 0" class="uni-indexed-list__list">
			<view 
				v-for="(item, index) in itemList.items" :key="index" 
				class="uni-indexed-list__item" 
				:class="{
					'uni-indexed-list__item-active' : item.active,
					'uni-indexed-list__item-editing' : item.editing || editingAll,
					'uni-indexed-list__item-insuff' : item.amount < item.baseUnit, // disable minus button
					'uni-indexed-list__item-runningout' : item.amount < item.thresh && item.amount > 0, // highlight hint
					'uni-indexed-list__item-runout' : item.amount <= 0, // grayify whole button
				}"
				hover-class="uni-indexed-list__item--hover"
				@tap="handleItemTap($event, item, index)"
				@longpress="longPress(item)"
			>
				<view class="uni-indexed-list__item-container" >
					<view class="uni-indexed-list__item-border" 
						:class="{'uni-indexed-list__item-border--last':index===itemList.items.length-1}"
					>
						<view v-if="showSelect" style="margin-right: 20rpx;">
							<uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
						</view>
						<text class="uni-indexed-list__item-operator operator-minus" @tap="updateAmount(-1, item)">-</text>
						<text class="uni-indexed-list__item-content">{{ item.name }}</text>
						<text class="uni-indexed-list__item-amount amount-unit">{{ item.amount }}</text>
						<text class="uni-indexed-list__item-unit amount-unit">{{ item.unit }}</text>
						<text class="uni-indexed-list__item-operator operator-add" @tap="updateAmount(1, item)">+</text>
					</view>
				</view>
				<view class="uni-indexed-list__item-amount-indicator"></view>
				<view class="uni-indexed-list__item-delete" @click="deleteItem($event, item, index)">
					<image class="uni-indexed-list__item-delete-icon" src="../../static/icon/cross.png" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import uniIcons from '../uni-icons/uni-icons.vue';
	// import _ from "lodash";
	
	export default {
		name: 'UniIndexedList',
		components: {
			// uniIcons
		},
		props: {
			loaded: {
				type: Boolean,
				default: false
			},
			idx: {
				type: Number,
				default: 0
			},
			list: {
				type: Object,
				default () {
					return {}
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			},
			editingAll: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				itemList: this.list,
			}
		},
		computed: {
		},
		methods: {
			handleItemTap(e, item, index) {
				// don't handle if it's editing
				if (item.editing || this.editingAll) return;
				this.$set(this.itemList.items, item.itemIndex, {
					...item,
					active: !item.active
				});
				let idx = this.idx; // dont know why not working if put in block below
				this.$emit("itemClick", {
					idx,
					index
				});
			},
			deleteItem(e, item, index) {
				console.log("trying to delete: ", item.name);
				// delete item of 'index'
			},
			longPress(item) {
				this.$set(this.itemList.items, item.itemIndex, {
					...item,
					editing: !item.editing
				});
			},
			updateAmount(opr, item) {
				// negative check
				let newAmount = item.amount + opr * item.baseUnit;
				if (newAmount < 0) return;
				this.$set(this.itemList.items, item.itemIndex, {
					...item,
					amount: newAmount
				});
				// console.log(this.itemList.items);
				// if (newAmount === 0) {
				// 	// TODO: confirm before removal
				// 	this.itemList.items.splice(item.itemIndex, 1);
					
				// 	// update itemIndex
				// }
				console.log(this.itemList.items);
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "../../common/var.scss";
	@import "../../common/presets.scss";
	.uni-indexed-list__list {
		/* #ifndef APP-NVUE */
		/* #endif */
		border-top-style: solid;
		border-top-width: 1px;
		border-top-color: #e5e5e5;
	}

	.uni-indexed-list__item {
		font-size: 16;
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		position: relative;
		margin: 10px 0 0 10px;
		padding: 8px 10px;
		border: solid 2px #fff;
		border-radius: 5px;
		@include decent-shadow;
		&:last-child {
			margin-bottom: 10px;
			margin-right: 10px;
		}
		&-active {
			border-color: $--primary-color-light;
			background-color: transparentize($color: $--primary-color-light, $amount: 0.4);
		}
		&-editing {
			border-color: $--primary-color-light;
			@include deeper-shadow;
		}
	}

	.uni-indexed-list__item-container {
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-indexed-list__item-border {
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-indexed-list__item {
		&-content {
			flex: 1;
			font-size: 14px;
			color: #272727;
			.uni-indexed-list__item-editing & {
				position: absolute;
				transform: translate(-3px, -12px);
				font-size: 8px;
			}
			.uni-indexed-list__item-runout & {
				color: #ccc;
			}
		}
		&-amount {
			width: 28px;
			margin-left: 10px;
			.uni-indexed-list__item-editing & {
				// margin: 0;
			}
		}
		&-unit {
			margin: 0 2px;
			.uni-indexed-list__item-editing & {
				margin-right: 10px;
			}
		}
		.amount-unit {
			color: #ccc;
		}
		&-operator {
			display: none;
			margin: 0 5px;
			.uni-indexed-list__item-editing & {
				display: inline-block;
			}
			
			.uni-indexed-list__item-insuff &.operator-minus {
				color: #ccc;
			}
		}
		&-content, &-amount, &-unit, &-operator {
			@include decent-transition;
		}
		&-amount-indicator {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			position: absolute;
			top: 3px;
			right: 3px;
			.uni-indexed-list__item-runningout & {
				background-color: transparentize($color: coral, $amount: 0.4);
			}
		}
		&-delete {
			width: 14px;
			height: 14px;
			&-icon {
				width: 100%;
				height: 100%;
				position: absolute;
			}
			border-radius: 50%;
			position: absolute;
			visibility: hidden;
			top: -7px;
			left: -7px;
			.uni-indexed-list__item-editing & {
				visibility: visible;
			}
		}
	}

	.uni-indexed-list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-indexed-list__title-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		// background-color: #f7f7f7;
	}

	.uni-indexed-list__title {
		padding: 6px 12px;
		// line-height: 24px;
		font-size: 12px;
		color: #666;
	}
</style>