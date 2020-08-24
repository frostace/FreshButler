<template>
	<view class="count-box" :class="status ? 'count-box-light' : 'count-box-gray'">
		<view class="count-minus count-pub" :class="[myValue <= min ? 'light' : 'gray']" @tap.stop="less"  @longpress='longpressLess' @touchend="handletouchend">-</view>
		<input class="count-input" type="number" v-model="myValue" @focus="onFocus" @blur="onBlue"/>
		<view class="count-unit">{{myUnit}}</view>
		<view class="count-add count-pub" :class="[myValue >= max ? 'light' : 'gray']" @tap.stop="add" @longpress='longpressAdd' @touchend="handletouchend">+</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myValue: 0,
				myUnit: "asd",
				status: false,
				timer: null
			}
		},
		props: {
			// 计数器中的值
			value: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 10000
			},
			min: {
				type: Number,
				default: 0
			},
			increment: {
				type: Number,
				default: 1
			},
			unit: {
				type: String,
				default: ""
			},
			// 点击当前数据的索引
			index: {
				type: Number
			},
			delayed: {
				type: Number,
				default: 200
			}
		},
		created() {
			this.myValue = this.value;
			this.myUnit = this.unit;
		},
		watch: {
			value(val) {
				this.myValue = val;
			}
		},
		methods: {
			onBlue() {
				if (+this.myValue >= this.max) {
					this.myValue = this.max;
					this.status = false;
				} else if (+this.myValue <= this.min) {
					this.myValue = this.min;
					this.status = false;
				} else {
					this.status = true;
					this.myValue = +this.myValue;
				}
				if (!isNaN(this.myValue)) {
					this.$emit('handleCount', this.myValue, this.index);
				} else {
					this.$emit('handleCount', 0, this.index);
				}
				
			},
			onFocus() {
				this.status = true;
			},
			add() {
				this.addPublick();
			},
			addPublick() {
				if (this.myValue >= this.max) {
					this.status = false;
					this.myValue = this.max;
					clearInterval(this.timer);
				} else {
					this.status = true;
					this.myValue += this.increment;
				}
				this.$emit('handleCount', this.myValue, this.index);
			},
			longpressAdd() {
				this.timer = setInterval(() => {
					this.addPublick();
				}, this.delayed);
			},
			less() {
				this.lessPublick();
			},
			lessPublick() {
				if (this.myValue <= this.min) {
					clearInterval(this.timer);
					this.status = false;
					this.myValue = this.min;
				} else {
					this.status = true;
					this.myValue -= this.increment;
				}
				this.$emit('handleCount', this.myValue, this.index);
			},
			longpressLess() {
				this.timer = setInterval(() => {
					this.lessPublick();
				}, this.delayed);
			},
			handletouchend() {
				clearInterval(this.timer);
			}
		}
	}
</script>
<style>
	.gray{
		background: #eef3f9;
		color: #555555;
	}
	.light{
		background: #f5f7fa;
		color: #C8C7CC;
	}
	.count-box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 220rpx;
		height: 60rpx;
		border-radius: 5px;
		z-index: 1;
		transition: all .3s;
	}
	.count-box-light{
		border: 1px solid #add4ff;
	}
	.count-box-gray{
		border: 1px solid #e4e4e4;
	}
	.count-pub{
		width: 80rpx;
		height: 100%;
		text-align: center;
		font-weight: 200;
		line-height: 60rpx;
		font-size: 20px;
	}
	.count-minus{
		border-top-left-radius:4px;
		border-bottom-left-radius:4px;
	}
	.count-add{
		border-top-right-radius:4px;
		border-bottom-right-radius:4px;
	}
	.count-input{
		width: 110rpx;
		height: 100%;
		padding: 6rpx 10rpx;
		box-sizing: border-box;
		color: #808080;
		font-size: 26rpx;
		text-align: center;
	}
	.count-unit {
		font-size: 26rpx;
		color: #808080;
		padding-right: 4px;
	}
</style>
