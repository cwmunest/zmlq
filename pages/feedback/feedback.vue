<template>
	<!-- 意见反馈 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="意见反馈" @clickLeft="goBack"></uni-nav-bar>
		<view class="feedBackBox">
			<textarea placeholder="请输入您的意见" v-model="content" />
			</view>
		<view class="btnFixed" @click="queryAppArticleList">提交</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import {
		backTo,showMsg
	} from '@/utils/utils.js';
	import executeS from '@/service/executeS.js';
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				goBack: backTo,
				content:''
			};
		},
		methods:{
			queryAppArticleList: (_this) => {
				const paramsPayload = {
					apixkey: "queryAppAdviseAdd",
					payload: {content:_this.content}
				}
				executeS(paramsPayload).then(response=>{
					if (response.success) {
						showMsg('提交成功','success')
						_this.content = ''
						// backTo()
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.feedBackBox {
		background-color: $uni-bg-color;
		padding: 28rpx;
		textarea {
			width: 100%;
			background-color: $uni-border-color;
			padding: 28rpx;
			box-sizing: border-box;
		}
	}
	.btnFixed {
		width: 100%;
		height: 92rpx;
		background-color: #f74f2a;
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 92rpx;
	}

</style>
