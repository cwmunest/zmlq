<template>
	<!-- 在线预定 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="特产预定" @clickLeft="goBack"></uni-nav-bar>
		<view class="formBox">
			<cell :title="'红蟳'"></cell>
			<cell :title="'数量'">
				<view class="" slot="value">
					<uni-number-box :min="1" @change="bindChange"></uni-number-box>
				</view>
			</cell>
		</view>
		<lay-out-wrap :title="'备注'" :isMoreShow="false">
			<view class="remark" slot="content">
				<textarea placeholder="备注内容" />
			</view>
		</lay-out-wrap>
		<view class="formBox">
			<cell :title="'预定人'">
				<view slot="value">
					<input type="text" placeholder="请输入预定人姓名" />
				</view>
			</cell>
			<cell :title="'联系电话'">
				<view class="" slot="value">
					<input type="number" placeholder="请输入联系电话" />
				</view>
			</cell>
		</view>
		<view class="btnFixed" @click="onReserve">提交预定</view>
	</view>
</template>

<script>
	import LayOutWrap from'@/components/layout.vue';
	import cell from'@/components/cell.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniNumberBox from "@/components/uni-number-box.vue"
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			cell,
			uniNumberBox
		},
		data() {
			return {
				goBack:backTo,
			};
		},
		methods:{
			onReserve() {
				linkTo('/pages/reserveSuccess/reserveSuccess?type=1')
			}
		}
	}
</script>

<style lang="scss">
	.formBox {
		background-color: $uni-bg-color;
		padding: 0 28rpx;
		margin: 20rpx 0;
		input {
			font-size: 28rpx;
		}
	}
	.remark {
		padding: 0 28rpx;
		box-sizing: border-box;
		textarea {
			background-color: $uni-border-color;
			width: 100%;
			padding: 25rpx;
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
