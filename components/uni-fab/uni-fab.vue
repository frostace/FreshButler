<template>
	<view class="uni-fab">
		<view 
			class="uni-fab-box"
			:class="{'uni-fab-box-expanded': expanded}"
			@click.stop="handleClickIcon"
		>
			<view class="uni-fab-items" @click.stop="">
				<slot name="content"></slot>
			</view>
			<span class="uni-fab-box-icon">
				<slot name="box"></slot>
			</span>
		</view>
	</view>
</template>

<script>
	export default {
		// props: {
		// 	defaultExpanded: false,
		// },
		data() {
			return {
				expanded: false,
			}
		},
		methods: {
			handleClickIcon() {
				this.expanded = !this.expanded;
				this.$emit('trigger');
			}
		},
		mounted() {
			uni.$on('hideItems', () => {
				this.expanded = false;
			});
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../common/var';
	@import '../../common/presets';
	
	.uni-fab-items {
		transition: visibility 3s linear, opacity 3s linear linear;
		.uni-fab-box & {
			visibility: hidden;
			opacity: 0;
		}
		.uni-fab-box-expanded & {
			visibility: visible;
			opacity: 1;
		}
		background-color: $--primary-color;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 50px;
		right: 0;
		
		padding: 10px 15px;
		border-radius: 10px;
	}
	
	.uni-fab-box {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: $--primary-color;
	
		line-height: 40px;
		font-size: 30px;
		font-weight: 500;
		
		color: white;
		
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	
	.uni-fab-box-icon {
		@include decent-transition;
		.uni-fab-box-expanded & {
			transform: rotate(45deg);
		}
	}
</style>