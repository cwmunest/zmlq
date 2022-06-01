<template>
	<view class="layoutWrap">
		<view class="inner">
			<view class="layoutHd">
				<view class="title"><view class="blockBox" :style="{background:blockColor}"></view>{{title}}</view>
				<view class="extra">
					<slot name="extra"></slot>
					<view class="moreTextWrap" v-if="isMoreShow">
					<view class="text" @click="onMore">更多</view>
					<view class="icon"></view>
					</view>
				</view>
				
			</view>
			<view class="layoutBd">
				<slot name="content"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'LayOutWrap',
		props:{
			title:{
				type:String,
				default() {
					return "标题"
				}
			},
			blockColor:{
				type:String,
				default() {
					return '#007aff'
				}
			},
			isMoreShow:{
				type:Boolean,
				default() {
					return true
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			onMore() {
				this.$emit('onClick')
			}
		}
	}
</script>

<style lang="scss">
	@import "../uni.scss";
	.layoutWrap{
		width:100%;
		.inner{
			width:100%;
			background: $uni-bg-color;
			.layoutHd{
				padding:10rpx 20rpx;
				position:relative;
				display:flex;
				justify-content:space-between;
				align-items:center;
				height:50rpx;
				
				.title{
					font-size:30rpx;
					font-weight:normal;
					position:relative;
					padding-left:20rpx;
					.blockBox{
						width:7rpx;
						height:20rpx;
						position:absolute;
						z-index:1;
						left:0rpx;
						top:50%;
						margin-top:-10rpx;
					}
				}
				.moreTextWrap{
					color:$uni-text-color-grey;
					font-size:26rpx;
					display:flex;
					justify-content:center;
					align-items:center;
				}
				.icon{
					background:url("../static/images/zmlq/arrowR.png") no-repeat left center;
					width:16rpx;
					height:16rpx;
					background-size:100% 100%;
				}
			}
			.layoutBd{
				width:100%;
				padding:10rpx 0;
				box-sizing: border-box;
			}
	
		}
	}



</style>
