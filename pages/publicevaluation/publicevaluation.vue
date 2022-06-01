<template>
	<view class="x-panel x-full">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="公众评价" @clickLeft="goBack"></uni-nav-bar>
		<view class="pa-20 x-panel-content x-top-navbar x-bottom-btn">
			<view class="title">您对市政情况的评分星级为：</view>
			<view class="uni-padding-wrap uni-common-mt star">
				<view class="uni-flex uni-row">
					<view :class="{starActive:item}" @click="choise(index)" class="flex-item iconfont" v-for="(item,index) in clicked_list">
						<view v-if="item" class="starIcon">
							&#xe601;
						</view>
						<view v-else class="starIcon">
							&#xe602;
						</view>
					</view>
				</view>
			</view>
			<view class="pt-20">
				<view class="pb-10 title">说上几句：</view>
				<textarea v-model="remark" placeholder="请输入评价内容" auto-height></textarea>
			</view>
		</view>
		<view class="x-btn-submit" @click="onSubmit">提交</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import executeS from '@/service/executeS.js';
	import {backTo,upLoad,showMsg, getStorage } from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
		},
		data() {
			return {
				goBack: backTo,
				remark:'',
				grade:0,
				clicked_list: [false, false, false, false, false] //对应星星个数
			}
		},
		methods: {
			//starIcon
			starIcon(item) {
				if (item) {
					return '&#xe601;'
				} else {
					return '&#xe602;'
				}
			},
			//点击选择
			choise(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_list = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_list[i] = true;
				}
				//将分数传给父组件
				//this.$emit('getScore', num)
				this.grade=num;
			},
			onSubmit() {
				if (!this.grade) return showMsg("请评级！");
				let data={
					userId:Shell.UserInfo.id,
					grade:this.grade,
					content:this.remark
				}
				const paramsPayload = {
					apixkey: "queryAppPublicEvluationAdd",
					payload: data
				}
				executeS(paramsPayload).then(response=>{
					if(response.success) {
						showMsg('保存成功','success')
						this.goBack();
					}else{
						showMsg('提交失败','warn')
					}
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	/* @import "@/uni.scss"; */
	
	.star.uni-common-mt {
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		padding: 0 85upx;
		margin-top: 20upx;

		.flex-item {
			display: inline-block;
			width: 20%;
			color: #999;

			.starIcon {
				font-size: 52upx;
			}
		}

		.starActive {
			color: #ff8000;
		}
	}

	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot');
		src: url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1254062_cqoky071dbi.svg#font_family') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 12px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
		margin-left: 30upx;
	}
	.title{
		font-size: $uni-font-size-lg;
	}
	.btnSubmit {
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
