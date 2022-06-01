<template>
	<!-- 我要咨询 -->
	<view class="pageHomeWrap">
		<view class="content">
			<image src="/static/images/attract/info.png" mode="widthFix"></image>
			<view class="ts">
				<text>你好，尊敬的投资者</text>
				<text>我们提供以下两种咨询方式</text>
			</view>
			<view class="grounpBtn">
				<view class="btn">点击拨打咨询电话</view>
				<text>工作日：08:00至17:30</text>
				<view class="btn btnInfo" @click="goConsult">留言咨询</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		data() {
			return {

			};
		},
		methods:{
			goConsult() {
				linkTo('/pages/consult/consult')
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 374rpx;
			margin-top: 120rpx;
		}

		.ts {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-size: 30rpx;
			color: #787878;
			margin-bottom: 235rpx;
		}

		.grounpBtn {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.btn {
				width: 565rpx;
				height: 82rpx;
				background-color: #0289e3;
				border-radius: 12rpx;
				font-size: 30rpx;
				color: #fff;
				text-align: center;
				line-height: 82rpx;
			}
			text {
				font-size: 24rpx;
				color: #0289e3;
				margin-top: 17rpx;
				margin-bottom: 49rpx;
			}
			.btnInfo {
				background-color: #fea50b;
			}
		}
	}
</style>
