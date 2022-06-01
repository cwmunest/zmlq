<template>
	<view class="searchBox">
		<view class="searchInput">
			<image src="/static/images/common/sousuo.png" mode="widthFix" @click="onSearch"></image>
			<input type="text" placeholder="关键字搜索" placeholder-class="pla" v-model="searchStr" @confirm="onSearch"/>
		</view>
		<picker mode="date" fields="year" start="1920" end="2020" @change="bindDateChange">
			<view class="sBtn">年份搜索</view>
		</picker>
	</view>
</template>

<script>
	export default {
		name: 'searchBox',
		data() {
			return {
				searchStr:''
			};
		},
		methods: {
			bindDateChange(e) {
				this.$emit('onChange',e.target.value)
			},
			onSearch() {
				let searchStr = this.searchStr
				this.$emit('onConfirm',{searchStr:searchStr})
			}
		}
	}
</script>

<style lang="scss">
	.searchBox {
		height: 106rpx;
		background-color: #fff4f4;
		display: flex;
		align-items: center;
		padding: 0 35rpx;
		justify-content: space-between;

		.searchInput {
			display: flex;
			align-items: center;
			width: 432rpx;
			height: 64rpx;
			background-color: #ffffff;
			border-radius: 32rpx;
			padding: 15rpx 20rpx;
			box-sizing: border-box;

			image {
				width: 33rpx;
			}

			input {
				margin-left: 28rpx;
				font-size: 26rpx;
			}

			.pla {
				color: #9f9090;
			}
		}

		.sBtn {
			width: 167rpx;
			height: 58rpx;
			background-color: #cc0000;
			border-radius: 6rpx;
			color: #ffffff;
			font-size: 28rpx;
			text-align: center;
			line-height: 58rpx;
			position: relative;

			&:before {
				content: '|';
				position: absolute;
				font-size: 48rpx;
				left: -48rpx;
				color: #c4c4c4;


			}
		}
	}
</style>
