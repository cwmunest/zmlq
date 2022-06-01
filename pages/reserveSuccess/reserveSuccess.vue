<template>
	<!-- 在线预订成功 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" :title="title" @clickLeft="goBack"></uni-nav-bar>
		<view class="infoBox">
			<image src="/static/images/common/tijiaochenggong.png" mode="widthFix"></image>
			<view class="infoTxt" v-if="type == 1">您的预订信息已提交，我们会尽快与您联系</view>
			<view class="infoTxt" v-if="type == 2">您的投诉已提交，美丽琅岐岛感谢您的助力</view>
			<view class="btn" @click="goBack1">返回</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {backTo} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				goBack:backTo,
				type:1,
				title:''
			};
		},
		onLoad(options) {
			const _this = this;
			let title = '';
			_this.type = options.type
			switch (options.type){
				case '1':
					title = '在线预订'
					break;
				case '2': 
					title = '投诉结果'
					break;
				default:
					break;
			};
			this.title = title
			uni.setNavigationBarTitle({
				title:title
			})
			
		},
		methods: {
			goBack1() {
				backTo()
			}
		}
	}
</script>

<style lang="scss">
	.infoBox {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 358rpx;
			margin-top: 92rpx;
		}

		.infoTxt {
			width: 362rpx;
			font-size: 28rpx;
			color: #1b1b1b;
			text-align: center;
			margin: 64rpx 0 92rpx;
		}

		.btn {
			width: 565rpx;
			height: 82rpx;
			background-color: #0289e3;
			border-radius: 12rpx;
			text-align: center;
			line-height: 82rpx;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
</style>
