<template>
	<!-- 我要咨询-咨询 -->
	<view class="pageHomeWrap">
		<!-- 导航 -->
		<uni-nav-bar left-icon="back" title="我要咨询" @clickLeft="goBack"></uni-nav-bar>
		<view class="formBox">
			<cell :title="'咨询简述'">
				<view class="valueR" slot="value" @click="open">{{consultTxt}}</view>
			</cell>
		</view>
		<lay-out-wrap :title="'详细描述'" :isMoreShow="false">
			<view class="remark" slot="content">
				<textarea placeholder="请输入描述内容" />
				</view>
		</lay-out-wrap>
		<lay-out-wrap title="相关照片" :isMoreShow="false">
			<view class="photoBox" slot="content">
				<xyz-choose-image></xyz-choose-image>
			</view>
		</lay-out-wrap>
		<view class="formBox">
			<cell :title="'咨询人'">
				<view class="valueR" slot="value">
					<input type="text" placeholder="请输入咨询人姓名" />
				</view>
			</cell>
			<cell :title="'联系电话'">
				<view class="valueR" slot="value">
					<input type="number" placeholder="请输入联系电话" />
				</view>
			</cell>
		</view>
		<view class="btnFixed" @click="onReserve">提交</view>
		<uni-popup ref="popup" type="center">
			<view class="popMain">
				<view class="popBox">
					<view class="popCell" v-for="(item,index) in consultArrData" :key="index" @click="choiseL(index)">
						<icon type="success" size="22" v-if="item.check"></icon>
						<view class="failIcon" v-else></view>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="popFooter">
					<view class="cancel" @click="close">取消</view>
					<view class="confirm" @click="onConfirm">确定</view>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import LayOutWrap from'@/components/layout.vue';
	import cell from'@/components/cell.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import xyzChooseImage from "@/components/xyz-choose-image.vue"
	import {backTo,linkTo} from '@/utils/utils.js';
	export default {
		components: {
			uniNavBar,
			LayOutWrap,
			cell,
			uniNavBar,
			uniPopup,
			xyzChooseImage
		},
		data() {
			return {
				goBack:backTo,
				consultTxt:'请选择',
				consultArrData:[{
					name:'简述一',
					check:false
				},
				{
					name:'简述二',
					check:false
				},
				{
					name:'简述三',
					check:false
				}],
			};
		},
		methods:{
			open() {
				this.$refs.popup.open()
			},
			choiseL(index) {
				let consultArrData = this.consultArrData
				consultArrData[index].check = !consultArrData[index].check
			},
			onCancel() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.formBox {
		background-color: $uni-bg-color;
		padding: 0 28rpx;
		margin: 20rpx 0;
		.valueR {
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
	.photoBox {
		margin: 0 28rpx;
	}
	.popMain {
		background-color: $uni-bg-color;
		border-radius: 16rpx;
		.popBox {
			padding: 28rpx;
			font-size: 28rpx;
			width: 400rpx;
			.popCell {
				display: flex;
				align-items: center;
				margin: 28rpx 0;
				icon {
					margin-right: 15rpx;
				}
				.failIcon {
					width: 43rpx;
					height: 43rpx;
					border-radius: 50%;
					background-color: #f8f8f8;
					border: 1rpx solid #ddd;
					margin-right: 15rpx;
				}
			}
		}
		.popFooter {
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			justify-content: space-around;
			border-top: 1rpx solid $uni-border-color;
			width: 100%;
			view {
				width: 50%;
				text-align: center;
			}
			.cancel {
				border-right: 1rpx solid $uni-border-color;
			}
			.confirm {
				color: rgb(2, 137, 227);
			}
		}
	}
	
</style>
