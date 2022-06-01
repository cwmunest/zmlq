<template>
	<!-- 修改密码 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="修改密码" @clickLeft="goBack"></uni-nav-bar>
		<view class="formBox">
			<cell title="旧密码">
				<view class="headerBox" slot="value">
					<input type="password" placeholder="请输入旧密码" />
				</view>
			</cell>
			<cell title="新密码">
				<view class="headerBox" slot="value">
					<input type="password" placeholder="请输入新密码" />
				</view>
			</cell>
			<cell title="确认新密码">
				<view class="headerBox" slot="value">
					<input type="password" placeholder="请输入确认新密码" />
				</view>
			</cell>
		</view>
		<view class="btnFixed" @click="onReserve">保存</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import cell from '@/components/cell.vue';
	import {
		backTo
	} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			cell
		},
		data() {
			return {
				goBack: backTo,
			};
		}
	}
</script>

<style lang="scss">
	.formBox {
		padding: 0 28rpx;
		background-color: $uni-bg-color;

		.headerBox {
			font-size: 28rpx;
			input {
				text-align: right;
			}
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
