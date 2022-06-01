<template>
	<view class="itemCellBox" :class="check?'active':''">
		<view class="imgIcon">
			<image src="/static/images/common/bofang1.png" mode="widthFix" v-if="check"></image>
			<text>{{title}}</text>
		</view>
		<text>{{date}}</text>
	</view>
</template>

<script>
	export default {
		name:'itemCell',
		props:{
			title:{
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
			},
			check:{
				type:Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.itemCellBox {
		height: 98rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid $uni-border-color;
		background-color: $uni-bg-color;
		.imgIcon {
			display: flex;
			align-items: center;
			image {
				width: 33rpx;
				margin-right: 14rpx;
			}
			text {
				font-size: 30rpx;
				color: #1b1b1b;
			}
		}
		text {
			color: #bebdbd;
			font-size: 24rpx;
		}
	}
	.active {
		background-color: #fafafa;
	}

</style>
