<template>
	<view class="layOutBox">
		<view class="layOutHd">
			<view class="titleBox">
				<view class="num">{{num}}</view>
				<view class="title">
					<view class="englishTitle">{{englishTitle}}</view>
					<view class="chineseTitle">/{{chineseTitle}}</view>
				</view>
			</view>
			<image v-if="!iconIsBg" :src="iconUrl" mode="widthFix"></image>
		</view>
		<view class="layOutCn">
			<slot name="content"></slot>
		</view>
		<image class="iconBg" v-if="iconIsBg" :src="iconUrl" mode="widthFix"></image>
		<view class="layOutMore" @click="onMore" v-if="isMore">查看更多</view>
	</view>
</template>

<script>
	export default {
		name:'layOutBox',
		props:{
			num:{
				type:String,
				default() {
					return ''
				}
			},
			chineseTitle:{
				type:String,
				default() {
					return ''
				}
			},
			englishTitle:{
				type:String,
				default() {
					return ''
				}
			},
			iconUrl:{
				type:String,
				default() {
					return ''
				}
			},
			isMore:{
				type:Boolean,
				default() {
					return true
				}
			},
			iconIsBg:{
				type:Boolean,
				default() {
					return false
				}
			}
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			onMore() {
				this.$emit('onClick')
			}
		}
	}
</script>

<style lang="scss">
	.layOutBox {
		background-color: $uni-bg-color;
		position: relative;
		margin-bottom: 24rpx;
		.layOutHd {
			padding-top: 35rpx;
			padding-left: 29rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			image {
				width: 112rpx;
			}
			.titleBox {
				display: flex;
				align-items: center;
				.num {
					font-size: 72rpx;
					color: #3d4042;
				}
				.title {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					width: 132rpx;
					.englishTitle {
						font-size: 20rpx;
						color: #ababab;
					}
					.chineseTitle {
						font-size: 28rpx;
						color: #3d4042;
					}
					
				}
				
			}
		}
		.iconBg {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 0;
		}
		.layOutMore {
			height: 87rpx;
			line-height: 87rpx;
			text-align: center;
			font-size: 24rpx;
			color: #bababa;
			padding: 0 20rpx;
			border-top: 1rpx solid $uni-border-color;
		}
	}

</style>
