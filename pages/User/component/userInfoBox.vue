<template>
	<view class="userInfoWrap" @click="goDetail">
		<view class="headerBox">
			<image :src="info.images" class="header" mode="aspectFill"></image>
			<view class="infoBox">
				<text>{{info.name}}</text>
				<label>{{info.work}}</label>
			</view>
		</view>
		<image class="arrowR" src="/static/images/user/arrowR.png" mode="widthFix"></image>
		
	</view>
</template>

<script>
	import {
		linkTo
	} from '@/utils/utils.js';
	export default {
		name:'userInfoBox',
		props:{
			info:{
				type:Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		methods:{
			goDetail() {
				linkTo('/pages/personalInfo/personalInfo')
			}
		}
	}
</script>

<style lang="scss">
	.userInfoWrap {
		height: 238rpx;
		width: 100%;
		background-image: url('/static/images/user/head_bg.png');
		background-size: cover;
		padding: 48rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.headerBox {
			display: flex;
			align-items: center;
			.header {
				width: 137rpx;
				height: 137rpx;
				border-radius: 50%;
				border: 5rpx solid #fef0cd;
				margin-right: 31rpx;
			}
			.infoBox {
				display: flex;
				flex-direction: column;
				text {
					font-size: 34rpx;
					color: #fff;
				}
				label {
					font-size: 28rpx;
					color: #8c8da0;
				}
			}
		}
		.arrowR {
			width: 11rpx;
		} 
	}
</style>
