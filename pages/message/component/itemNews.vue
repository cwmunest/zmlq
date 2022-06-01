<template>
	<view class="itemNewsBox" @click="onDetail">
		<image :src="imgUrl"></image>
		<view class="info">
			<view class="title">
				<text>{{title}}</text>
				<label>{{date}}</label>
			</view>
			<view class="desc">{{desc}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'itemNews',
		props:{
			imgUrl:{
				type:String,
				default() {
					return 'https://himg2.huanqiucdn.cn/attachment2010/2020/0107/20200107073359569.jpg'
				}
			},
			title:{
				type:String,
				default() {
					return ''
				}
			},
			desc:{
				type:String,
				default() {
					return ''
				}
			},
			date:{
				type:String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			onDetail() {
				this.$emit('onClick')
			}
		}
	}
</script>

<style lang="scss">
	.itemNewsBox {
		background-color: $uni-bg-color;
		padding: 28rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid $uni-border-color;
		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 15rpx;
		}
		.info {
			font-size: 28rpx;
			width: calc(100% - 95rpx);
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				label {
					color: #999999;
					font-size: 24rpx;
				}
			}
			.desc {
				color: #6f6565;
				font-size: 24rpx;
			}
		}
	}

</style>
